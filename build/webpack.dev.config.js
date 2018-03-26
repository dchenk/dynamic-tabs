const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");

module.exports = merge(baseWebpackConfig, {
	entry: "./demo.js",
	module:{
		rules: [
			{
				test: /(\.css|\.scss|\.sass)$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "postcss-loader",
						options: {
							plugins: () => [
								require("autoprefixer")
							],
							sourceMap: true
						}
					},
					{
						loader: "sass-loader",
						options: {
							includePaths: [path.resolve("./", "scss")],
							sourceMap: true
						}
					}
				]
			}
		]
	},
	devServer: {
		contentBase: "./",
		publicPath: "/dist",
		hot: true
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify('development'),
			__DEV__: true
		}),
		new webpack.HotModuleReplacementPlugin()
	]
});
