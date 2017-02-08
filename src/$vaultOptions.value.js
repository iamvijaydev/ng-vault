'use strict';

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
