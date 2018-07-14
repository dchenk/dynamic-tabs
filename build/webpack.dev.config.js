const path = require("path");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");

module.exports = merge(baseWebpackConfig, {
	entry: "./docs/demo.js",
	output: {
		path: path.resolve("./", "dist"),
		filename: "dev-bundle.js"
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
		contentBase: "./",
		publicPath: "/dist",
		watchContentBase: true
	}
});
