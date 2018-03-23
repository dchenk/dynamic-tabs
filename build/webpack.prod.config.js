const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.common.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const plugin = new ExtractTextPlugin({
    // `allChunks` is needed to extract from extracted chunks as well.
    filename: "demo.css",
});

const webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: [
            {
                test: /(\.css)$/,
                exclude: [ /node_modules/],
                use:
                    plugin.extract({
                        use: ['css-loader'],
                        fallback: "style-loader",
                    }),
            }
        ]
    },
    plugins: [
        plugin
    ]
});

module.exports = webpackConfig;
