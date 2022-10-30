const prod = process.env.NODE_ENV === 'production'
console.log(`Running a \x1b[45m${process.env.NODE_ENV}\x1b[0m build`)

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const projectPath = __dirname.replace(/\\/g, '/') //Replace dum windows slashes

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
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
	optimization: {
		minimize: prod,
		minimizer: [
			new TerserPlugin({
				test: /\.js|.ts(\?.*)?$/i,
				terserOptions: {
					mangle: false,
					compress: false,
				},
				extractComments: 'all',
			}),
			new CssMinimizerPlugin({
				minify: CssMinimizerPlugin.cssoMinify,
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: `${projectPath}/public`,
						to: `${projectPath}/build`,
					},
				],
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
