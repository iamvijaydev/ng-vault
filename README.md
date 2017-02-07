# ng-vault
Helper methods wrapped over angular's `$cacheFactory`. This module provides:

* `$vault` factory for storing and retrieving data.
* `$vaultConfigProvider` for configuring the behaviour of `$vault`



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


# Configuration
We can configure few things while the `mainApp` is configured. Here is an example:

```javascript
angular.module('mainApp')
    .config(function ($vaultConfigProvider) {
        $vaultConfigProvider.set({
            id: 'my-vault',
            limitTypes: [0, ''],
            putUpto: 5
        });
    });
```

### id - _{String}_ - _my-vault_
The unique name with which the internal `store` ((code)[]) of `ng-vault` will be created.

### limitTypes - _{Array}_ - _[]_
We can limit the type of the values that are allowed to be store in our `$vault`. To avoid any confusion regarding the types, the provider expects the entries to be an actual value rather than `typeof value`. In the example above we are providing number and string as the only two types to be stored. Skip this to allow all values.

### putUpto - _{Number}_ - _3_
We can store a value for certain time with `$vault.putUpto(key, value, mins)`. After which the value will be automatically removed from store. This option allows to configure the default timeout value, in case the actual user doesn't provide the timeout. In the example above we are setting the time to 5 mins.



# Usage
Now we can inject `$vault` into any other part of our code to `put` and `get` values. Here are the list of methods that `$vault` packs:
Method | Parameters | Description
--- | :--- | :---
put | `key`{string}, `value`{Any} | Put value into `$vault`
putUpto | `key`{string}, `value`{Any}, `mins`{Number} | Put for certain time, after which it will be removed
setOnce | `key`{string}, `value`{Any} | Put value and remove once it's retrieved
get | `key`{string} | Get the stored value. If not found will return `undefined`
remove | `key`{string} | Remove a key from `$vault`
removeAll | - | Remove everything from `$vault`



# TODO
Testing and code-coverage


#Future
Data is still stored in memory. Add methods to save them to `localStorage` or `indexedDB`.
