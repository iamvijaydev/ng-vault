const webpack = require('webpack');
const path = require('path');

module.exports = function() {
    return {
        entry: './src/index.js',
        output: {
            filename: 'ng-vault.js',
            path: path.resolve(__dirname, 'dist'),
            library: 'ng-vault',
            libraryTarget: 'umd'
        },
        target: 'node',
        externals: 'angular'
    };
}
