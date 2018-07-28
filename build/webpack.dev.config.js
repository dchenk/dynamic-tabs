const path = require("path");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");

module.exports = merge(baseWebpackConfig, {
	entry: "./docs/demo.js",
	output: {
		path: path.resolve("./", "docs"),
		filename: "built-bundle.js"
	},
	module:{
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					}
				]
			}
		]
	},
	devServer: {
		contentBase: "./docs/",
		publicPath: "/",
		openPage: "working.html",
		watchContentBase: true,
		open: true
	}
});
