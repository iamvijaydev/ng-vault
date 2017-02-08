'use strict';

var angular = require('angular');

function $vaultConfig ($vaultOptions) {
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
