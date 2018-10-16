require('dotenv/config')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const {clientConfig} = require('../../webpack.configs')
const appConfig = require('../../app-config')
const app = require('./app')

const compiler = webpack(clientConfig)
const devServer = new WebpackDevServer(compiler, clientConfig.devServer)

app.listen(appConfig.serverPort, appConfig.serverHost, () => {
	console.log(`API server listening at http://${appConfig.serverHost}:${appConfig.serverPort}/`)

	devServer.listen(appConfig.clientPort, appConfig.clientHost, err => {
		if (err) return console.error(err)
		console.log(`Dev server listening at http://${appConfig.clientHost}:${appConfig.clientPort}/`)
	})
})
