const path = require("path");

module.exports = {
	// context: path.resolve(__dirname, "../demo"),
	entry: {
		app: "./demo.js"
	},
	devtool: "inline-source-map",
	devServer: {
		contentBase: "./demo",
		publicPath: "./demo/"
	},
	plugins: [],
	output: {
		filename: "tabs.js",
		path: path.resolve(__dirname, "dist")
	}
};
