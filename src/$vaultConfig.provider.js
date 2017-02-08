'use strict';

function $vaultConfig ($vaultOptions) {
    var userOptions = {};

    return {
        set: function (options) {
            userOptions = options;
        },
        $get: function () {
            return Object.assign(
                {},
                $vaultOptions,
                userOptions
            )
        }
    };
}

$vaultConfig.$inject = ['$vaultOptions'];

module.exports = $vaultConfig;
