const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const plugin = new ExtractTextPlugin({
	filename: "demo.css",
});

module.exports = {
	entry: "./demo.js",
	output: {
		path: path.resolve("./", "docs"),
		// publicPath: "../demo",
		filename: "built.js"
	},
	module: {
		rules: [
			{
				test: /(\.css)$/,
				exclude: [/node_modules/],
				use: plugin.extract({
					use: ["css-loader"],
					fallback: "style-loader"
				})
			}
		]
	},
	plugins: [
		plugin
	]
};
