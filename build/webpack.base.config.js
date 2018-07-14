const path = require("path");

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			}
		]
	},
	output: {
		path: path.resolve("./", "dist"),
		filename: "bundle.js"
	}
};
