const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		app: "./index.js"
	},
	devtool: "inline-source-map",
	devServer: {
		contentBase: "./dist"
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Development",
			template: "index.html"
		})
	],
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/"
	}
};