const path = require("path");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(baseWebpackConfig, {
	entry: ["./src/index.js", "./src/tabs.css"],
	output: {
		path: path.resolve("./", "dist"),
		filename: "bundle.js"
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({}),
			new OptimizeCssAssetsPlugin({})
		]
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: "css-loader"
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "tabs.css"
		})
	]
});
