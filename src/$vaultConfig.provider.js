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

// app.config(function ($vaultConfigProvider) {
//     $vaultConfigProvider.set({
//         id: 'my-vault',
//         limitTypes: [0, ''],
//         putUpto: 5
//     });
// });

$vaultConfig.$inject = ['$vaultOptions'];

module.exports = $vaultConfig;
