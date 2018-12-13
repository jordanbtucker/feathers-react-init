require('dotenv/config')
const appConfig = require('../../app-config')
const app = require('./app')

app.listen(appConfig.port, appConfig.host, () => {
	console.log(`Listening at http://${appConfig.host}:${appConfig.port}/`)
})
