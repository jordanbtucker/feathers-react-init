require('dotenv/config')
const ngrok = require('ngrok')
const appConfig = require('../../app-config')
const app = require('./app')

app.listen(appConfig.port, appConfig.host, () => {
	console.log(`Listening at http://${appConfig.host}:${appConfig.port}/`)

	if (process.env.USE_NGROK === 'true') {
		ngrok.connect(appConfig.port).then(url => {
			console.log(`Listening at ${url}/`)
		})
	}
})
