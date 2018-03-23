const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge')
const prodWebpackConfig = require('./webpack.prod.config');

const webpackConfig = merge(prodWebpackConfig, {
    output: {
        path: path.resolve('./', 'demo'),
        publicPath: '../demo',
        filename: 'built.js'
    },
});

module.exports = webpackConfig;
