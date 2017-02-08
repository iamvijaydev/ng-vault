# ng-vault [![npm version](https://badge.fury.io/js/ng-vault.svg)](https://badge.fury.io/js/ng-vault)
===========
ng-vault wraps over angular's `$cacheFactory` to provide few nifty ways to save and retrieve data. ng-vault contains these two parts:
* `$vault` factory which has methods for storing and retrieving data.
* `$vaultConfigProvider` for configuring the behaviour of `$vault` factory.


# Installation
###Via yarn or npm:
```shell
# yarn (recommended)
$ yarn add ng-vault

#npm
$ npm install ng-vault --save
```
Then use it as:
```javascript
var angular = require('angular');
angular.module('mainApp', [ require('ng-vault') ]);
```
###Via bower:
```
$ bower install ng-augment-native-scroll --save
```
Then use it as:
```javascript
var angular = require('angular');
var ngAugmentNativeScroll = require('./bower_components/ng-vault/src');

angular.module('mainApp', ['ng-vault']);
```
You can also include it in the old fashion way as:
```html
<script src="/bower_components/ng-vault/dist/ng-vault.js"></script>
<!-- or -->
<script src="/bower_components/ng-vault/dist/ng-vault.min.js"></script>
```


# Provider Configuration
Normally we may not need to configure the behaviour of `$vault`. Still he is an example of how we can do it:
```javascript
angular.module('mainApp')
    .config(function ($vaultConfigProvider) {
        $vaultConfigProvider.set({
            id: 'my-vault',
            limitTypes: [0, ''],
            limitTypes: [{
                value: 0,
                type: typeof 0,

            }, {
                value: '',

            }]
            putUptoMins: 5
        });
    });
```

### id - type:`String` - default:`my-vault`
The unique name with which the internal `store` ((code)[https://github.com/iamvijaydev/ng-vault/blob/master/src/%24vault.factory.js#L6]) of `ng-vault` will be created.

### limitTypes - type:`Array` - default:`[]`
By default we can save any type of data into `$cacheFactory`, `$vault` can be configured to accept only the configured types. This can may be help control the storage limit. Skip this to allow `$vault` to save any type of data.

### putUpto - type:`Number` - default:`3`
Using when we put some data in, it will be retained as long as it's not removed. But sometime we may want to retain data only for a short while. It should be removed once the time is up. We can use `putUpto` method to put data with an additional `mins` argument. Here `putUptoMins` can be set as the default value to be used, in case `putUpto` is not provided with an additional `mins` argument.


# Usage
Now we can inject `$vault` into any other part of our code to `put` and `get` values. Here are the list of all methods that `$vault` packs:

### put
To put data in, only defined data. It will check the data type with the set `limitTypes`. If it passed it will saved. If not it will display a console warn.

Param | Type | Required | Details
--- | :--- | :--- | :---
key | String | yes | Name of the key
value | Any | yes | Value to be saved

### putUpto
Put for certain time, after which it will be removed

Param | Type | Required | Details
--- | :--- | :--- | :---
key | String | yes | Name of the key
value | Any | yes | Value to be saved
mins | Number | no | Mins after which the data should be removed

### putOnce
Put value and remove once it's retrieved.

Param | Type | Required | Details
--- | :--- | :--- | :---
key | String | yes | Name of the key
value | Any | yes | Value to be saved

### get
Get a stored data. If not found it will return `undefined`.

Param | Type | Required | Details
--- | :--- | :--- | :---
key | String | yes | Name of the key

### has
Check if a particular key exist. Returns `true` or `false`.

Param | Type | Required | Details
--- | :--- | :--- | :---
key | String | yes | Name of the key

### remove
Remove a key from `$vault`

Param | Type | Required | Details
--- | :--- | :--- | :---
key | String | yes | Name of the key

### removeAll
Remove everything from `$vault`

### info
Retrieve information regarding the store - id and size


# TODO
Testing and code-coverage


#Future
Data is still stored in memory. Add methods to save them to `localStorage` or `indexedDB`.
