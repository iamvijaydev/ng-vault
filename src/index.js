'use strict';

function main () {
    var angular = require('angular');
    var moduleName = 'ng-vault';

    angular.module(moduleName, [])
        .value('$vaultOptions', require('./$vaultOptions.value.js'))
        .provider('$vaultConfig', require('./$vaultConfig.provider.js'))
        .factory('$vault', require('./$vault.factory.js'));

    return moduleName;
}

module.exports = main();
