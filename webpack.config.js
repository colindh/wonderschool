const path = require('path');
const webpack = require('webpack');

module.exports = [{
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        index: 'index.html',
        port: 3000
    },
    devtool: 'inline-source-map',
    entry: ['./src/js/app.js'],
    mode: 'development',
    module: {
        rules: [
            {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query:  { presets: ['@babel/react'] }
            }
        ]
    },
    output: {
        filename: 'app.js',
        path: path.resolve('build/js')
    },
}];
