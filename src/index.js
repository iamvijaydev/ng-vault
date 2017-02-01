'use strict';

var angular = require('angular');

angular.module('ngVault', [])
    .value('$vaultOptions', require('./$vaultOptions.value.js'))
    .provider('$vaultConfig', require('./$vaultConfig.provider.js'))
    .factory('$vault', require('./$vault.factory.js'));
