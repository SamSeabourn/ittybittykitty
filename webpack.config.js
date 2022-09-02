const prod = process.env.NODE_ENV === 'production'

console.log(process.env.NODE_ENV)

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
		minimize: true,
		minimizer: [
			prod
				? new UglifyJsPlugin({
						include: /\.js$/,
						sourceMap: false,
						uglifyOptions: {
							comments: false,
							mangle: true,
						},
				  })
				: undefined,
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
