const path = require('path')
const debug = require('debug')('feathers-react-init')
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio')
const express = require('@feathersjs/express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorHandler = require('errorhandler')
const helmet = require('helmet')
const morgan = require('morgan')
const serveStatic = require('serve-static')

const app = express(feathers())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.text())
app.use(compression())
app.use(cookieParser())
app.use(cors())
app.use(helmet())

app.configure(express.rest())
app.configure(socketio())

app.use('/api/messages', {
	async create (data, params) {
		return data
	},

	async get (id, params) {
		const message = await Promise.resolve(`Hello, ${process.env.NAME}!`)
		debug('message: %s', message)
		return message
	},
})

if (process.env.NODE_ENV === 'production') {
	app.use(serveStatic(path.resolve(__dirname, '../../dist/public')))
}

app.use(errorHandler())
app.use(morgan('combined'))

module.exports = app
