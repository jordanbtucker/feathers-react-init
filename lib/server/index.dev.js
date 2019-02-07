require('dotenv/config')
const ngrok = require('ngrok')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const {clientConfig} = require('../../webpack.configs')
const appConfig = require('../../app-config')
const app = require('./app')

const compiler = webpack(clientConfig)

app.use(webpackDevMiddleware(compiler, {
	publicPath: clientConfig.output.publicPath,
}))

app.use(webpackHotMiddleware(compiler))

app.listen(appConfig.port, appConfig.host, () => {
	console.log(`Listening at http://${appConfig.host}:${appConfig.port}/`)

	if (process.env.USE_NGROK === 'true') {
		ngrok.connect(appConfig.port).then(url => {
			console.log(`Listening at ${url}/`)
		})
	}
})
