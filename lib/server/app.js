const crypto = require('crypto')
const path = require('path')
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
const middlewarify = require('express-async-handler')

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

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

const messages = []

app.use('/api/messages', {
	async create (data, params) {
		const message = Object.assign({}, data, {
			id: crypto.randomBytes(16).toString('hex'),
		})

		messages.push(message)
		return message
	},

	async find (params) {
		return messages
	},

	async get (id, params) {
		return messages.find(m => m.id === id)
	},
})

const messagesService = app.service('/api/messages')

messagesService.create({text: `Hello, ${process.env.NAME}!`})

app.get('/api', middlewarify(async (req, res) => {
	const model = {
		services: Object.keys(app.services).map(path => ({
			path,
			methods: Object.keys(app.service(path).methods),
		})),
	}

	res.render('api', model)
}))

app.on('connection', connection => app.channel('default').join(connection))

app.publish(() => app.channel('default'))

if (process.env.NODE_ENV === 'production') {
	app.use(serveStatic(path.resolve(__dirname, '../../dist/public')))
}

app.use(errorHandler())
app.use(morgan('combined'))

module.exports = app
