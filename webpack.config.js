var webpack = require('webpack');
var fs = require('fs');
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'ngVault.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'node',
    externals: 'angular',
    plugins: [
        new webpack.BannerPlugin({
            banner: `v${require('./package.json').version}\n\n${fs.readFileSync('./LICENSE', 'utf8')}`,
            raw: false,
            entryOnly: true
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'example'),
        compress: true,
        port: 3000,
        hot: true
    }
};
