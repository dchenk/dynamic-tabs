const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.common.config');

const webpackConfig = merge(baseWebpackConfig, {

    module:{
        rules: [
            {
                test: /(\.css|\.scss|\.sass)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')
                            ],
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [path.resolve('./', 'scss')],
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: './demo',
        publicPath: '/dist',
        hot: true
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
            __DEV__: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
});

module.exports = webpackConfig;
