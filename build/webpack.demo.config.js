const path = require("path");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackStringReplacePlugin = require("html-webpack-string-replace-plugin");

module.exports = merge(baseWebpackConfig, {
	entry: "./docs/demo.js",
	output: {
		path: path.resolve("./", "docs"),
		filename: "built-bundle-[contenthash].js"
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
			filename: "demo-[contenthash].css"
		}),
		new HtmlWebpackPlugin({
			template: "docs/working.html",
			excludeChunks: ["demo.js"] // Already included in template.
		}),
		new HtmlWebpackStringReplacePlugin({
			"\t<script src=\"built-bundle.js\"></script>\n\n": ""
		})
	]
});
