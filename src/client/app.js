import Debug from 'debug'
import React from 'react'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import './app.css'

const debug = Debug('feathers-react-init')

const app = feathers()

const socket = io()
app.configure(socketio(socket))

const messages = app.service('/api/messages')

export default class App extends React.Component {
	constructor () {
		super()
		this.state = {message: ''}
	}

	render () {
		return <h1>{this.state.message}</h1>
	}

	async componentDidMount () {
		messages.on('created', message => {
			debug('message: %s', message)
			this.setState({message})
		})

		await messages.create({})
	}
}
