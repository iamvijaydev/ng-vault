/*!
 * v0.4.0
 * 
 * MIT License
 * 
 * Copyright (c) 2017 Vijay Dev
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["ng-vault"] = factory(require("angular"));
	else
		root["ng-vault"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

function $vault ($vaultConfig, $cacheFactory, $timeout, $log) {
    var store = $cacheFactory( $vaultConfig.id ),
        setOnceTracker = {};

    return {
        put: function (key, value) {
            var typeCheck = function () {
                for ( var type in $vaultConfig.limitTypes ) {
                    if ( ! $vaultConfig.limitTypes[type] && angular[type](value) ) {
                        return false;
                    }
                }

                return true;
            }

            if ( angular.isDefined(value) ) {
                if ( typeCheck() ) {
                    store.put( key, value );
                    return store.get(key);
                } else {
                    $log.warn( 'Not allowed to save "' + key + '" with typeof "' + typeof value + '" type into $vault!' );
                    return undefined;
                }
            } else {
                $log.warn( 'Only defined values are allowed' );
                $log.warn( key, typeof value, value );
                return undefined;
            }
        },
        putUpto: function(key, value, mins) {
            var upto = typeof 0 === typeof mins ? mins : $vaultConfig.putUpto,
                delay = 1000 * 60 * upto,
                hasSet = this.put(key, value);

            if ( angular.isDefined(hasSet) ) {
                $timeout(
                    store.remove.bind(window, key),
                    delay
                );

                return hasSet;
            } else {
                return undefined;
            }
        },
        putOnce: function(key, value) {
            var unTracked = ! setOnceTracker[key],
                hasSet = this.set(key, value);

            if ( angular.isDefined(hasSet) && unTracked ) {
                setOnceTracker[key] = true;
                return hasSet;
            } else {
                return undefined;
            }
        },
        get: function(key) {
            if ( setOnceTracker[key] ) {
                setOnceTracker[key] = false;
                delete setOnceTracker[key];

                store.remove(key);
            }

            return store.get(key);
        },
        has: function (key) {
            return angular.isDefined( this.get(key) );
        },
        remove: store.remove,
        removeAll: function () {
            setOnceTracker = {}
            store.removeAll();
        },
        info: store.info
    }
}

$vault.$inject = ['$vaultConfig', '$cacheFactory', '$timeout', '$log'];

module.exports = $vault;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

function $vaultConfig ($vaultOptions, $log) {
    var userOptions = Object.assign(
        {},
        $vaultOptions
    )

    return {
        set: function (options) {
            if ( angular.isDefined(options.id) ) {
                userOptions.id = options.id;
            }

            if ( angular.isNumber(options.putUpto) ) {
                userOptions.putUpto = options.putUpto;
            }

            for ( var type in options.limitTypes ) {
                if ( angular.hasOwnProperty(options.limitTypes) ) {
                    userOptions.limitTypes[type] = options.limitTypes[type];
                } else {
                    $log.warn('Please follow proper limitTypes format:', 'https://github.com/iamvijaydev/ng-vault#provider-configuration' );
                    $log.warn('All limitTypes formats:', 'https://github.com/iamvijaydev/ng-vault/blob/master/src/%24vaultOptions.value.js#L5-L11');
                }
            }
        },
        $get: function () {
            return Object.assign(
                {},
                userOptions
            )
        }
    };
}

$vaultConfig.$inject = ['$vaultOptions'];

module.exports = $vaultConfig;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $vaultOptions = {
    id: '$vault',
    limitTypes: {
        isArray: true,
        isDate: true,
        isFunction: true,
        isNumber: true,
        isObject: true,
        isString: true
    },
    putUpto: 3
}

module.exports = $vaultOptions;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function main () {
    var angular = __webpack_require__(0);
    var moduleName = 'ng-vault';

    angular.module(moduleName, [])
        .value('$vaultOptions', __webpack_require__(3))
        .provider('$vaultConfig', __webpack_require__(2))
        .factory('$vault', __webpack_require__(1));

    return moduleName;
}

module.exports = main();


/***/ })
/******/ ]);
});