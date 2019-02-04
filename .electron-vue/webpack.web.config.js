'use strict'

process.env.BABEL_ENV = 'web'

const path = require('path')
const webpack = require('webpack')
const BabiliWebpackPlugin = require('babili-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

let webConfig = {
	devtool: '#cheap-module-eval-source-map',
	entry: {
		web: path.join(__dirname, '../src/renderer/main.js'),
		"editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
		"json.worker": 'monaco-editor/esm/vs/language/json/json.worker',
		"css.worker": 'monaco-editor/esm/vs/language/css/css.worker',
		"html.worker": 'monaco-editor/esm/vs/language/html/html.worker',
		"ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker'
	},
	module: {
		rules: [
			{
				test: /\.(js|vue)$/,
				enforce: 'pre',
				exclude: /node_modules/,
				use: {
					loader: 'eslint-loader',
					options: {
						formatter: require('eslint-friendly-formatter')
					}
				}
			},
			{
				test: /\.scss$/,
				use: ['vue-style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.sass$/,
				use: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
			},
			{
				test: /\.less$/,
				use: ['vue-style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.stylus$/,
				use: ['vue-style-loader', 'css-loader', 'stylus-loader']
			},
			{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader']
			},
			{
				test: /\.html$/,
				use: 'vue-html-loader'
			},
			{
				test: /\.js$/,
				use: 'babel-loader',
				include: [path.resolve(__dirname, '../src/renderer')],
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				use: {
					loader: 'vue-loader',
					options: {
						extractCSS: true,
						loaders: {
							sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
							scss: 'vue-style-loader!css-loader!sass-loader',
							less: 'vue-style-loader!css-loader!less-loader',
							stylus: 'vue-style-loader!css-loader!stylus-loader'
						}
					}
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: {
					loader: 'url-loader',
					query: {
						limit: 10000,
						name: 'imgs/[name].[ext]'
					}
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: {
					loader: 'url-loader',
					query: {
						limit: 10000,
						name: 'fonts/[name].[ext]'
					}
				}
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({filename: 'styles.css'}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '../src/index.ejs'),
			minify: {
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				removeComments: true
			},
			nodeModules: false
		}),
		new webpack.DefinePlugin({
			'process.env.IS_WEB': 'true'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	],
	output: {
		globalObject: 'self',
		filename: '[name].js',
		chunkFilename: '[name].bundle.js',
		path: path.join(__dirname, '../dist/web')
	},
	resolve: {
		alias: {
			'@': path.join(__dirname, '../src/renderer'),
			'vue$': 'vue/dist/vue.esm.js'
		},
		extensions: ['.js', '.vue', '.json', '.css']
	},
	target: 'web'
}

/**
 * Adjust webConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
	webConfig.devtool = ''

	webConfig.plugins.push(
		new BabiliWebpackPlugin(),
		new CopyWebpackPlugin([
			{
				from: path.join(__dirname, '../static'),
				to: path.join(__dirname, '../dist/web/static'),
				ignore: ['.*']
			}
		]),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	)
}

module.exports = webConfig
