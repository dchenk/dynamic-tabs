const merge = require("webpack-merge")
const baseWebpackConfig = require("./webpack.base.config");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(baseWebpackConfig, {
	entry: "./src/index.js",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{loader: "style-loader"},
					{loader: "css-loader", options: {minimize: true}}
				],
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: "src/tabs.css",
				to: "tabs.css"
			}
		])
	]
});
