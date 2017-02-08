'use strict';

var angular = require('angular');

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
