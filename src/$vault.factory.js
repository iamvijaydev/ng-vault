'use strict';

var angular = require('angular');

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
