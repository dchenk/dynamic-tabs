const path = require("path");

module.exports = {
    entry: [
        './demo/demo.js'
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.resolve('./', 'dist'),
        publicPath: '/dist',
        filename: 'bundle.js'
    },
};
