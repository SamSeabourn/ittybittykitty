const prod = process.env.NODE_ENV === 'production'

console.log(`Running a \x1b[45m${process.env.NODE_ENV}\x1b[0m build`)

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	mode: prod ? 'production' : 'development',
	entry: './src/index.tsx',
	output: {
		path: __dirname + '/build/',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				resolve: {
					extensions: ['.ts', '.tsx', '.js', '.json'],
				},
				use: 'ts-loader',
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					name: `[name].[ext]`,
				},
			},
		],
	},
	optimization: {
		minimize: !prod,
		minimizer: [
			new UglifyJsPlugin({
				include: /\.js$/,
				sourceMap: !prod,
				uglifyOptions: {
					comments: !prod,
					mangle: prod,
				},
			}),
			new CssMinimizerPlugin({
				minify: CssMinimizerPlugin.cssoMinify,
			}),
			new CopyWebpackPlugin({
				patterns: [{ from: 'public', to: '' }],
			}),
		],
	},
	devtool: prod ? undefined : 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
		new MiniCssExtractPlugin(),
	],
}
