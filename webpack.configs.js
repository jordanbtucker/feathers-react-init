const path = require('path')
const {HotModuleReplacementPlugin} = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const baseConfig = {
	mode: isProduction ? 'production' : 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
}

const serverConfig = Object.assign({}, baseConfig, {
	devtool: 'source-map',
	entry: [
		isProduction ? './src/server/index.js' : './src/server/index.dev.js',
	],
	// node: {
	// 	__dirname: false,
	// },
	output: {
		filename: 'server.js',
	},
	target: 'node',
})

const clientConfig = Object.assign({}, baseConfig, {
	devtool: isProduction ? '' : 'source-map',
	entry: [
		isProduction ? './src/client/index.js' : './src/client/index.dev.js',
	],
	output: {
		path: path.resolve(__dirname, 'dist/public'),
		filename: 'client.js',
		publicPath: '/',
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: 'src/client/index.html',
			filename: 'index.html',
		}),
	],
	target: 'web',
})

clientConfig.module.rules.push({
	test: /\.css$/,
	use: ['style-loader', 'css-loader'],
})

if (!isProduction) {
	clientConfig.plugins.push(new HotModuleReplacementPlugin())
}

module.exports = {
	serverConfig,
	clientConfig,
}
