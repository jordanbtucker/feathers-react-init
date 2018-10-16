require('dotenv/config')
const appConfig = require('../../app-config')
const app = require('./app')

app.listen(appConfig.serverPort, appConfig.serverHost, () => {
	console.log(`API server listening at http://${appConfig.serverHost}:${appConfig.serverPort}/`)
})
