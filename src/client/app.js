import React from 'react'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import './app.css'

const app = feathers()

const socket = io()
app.configure(socketio(socket))

const messagesService = app.service('/api/messages')

export default class App extends React.Component {
	constructor () {
		super()
		this.state = {
			messages: [],
			text: '',
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	render () {
		return (
			<div>
				<h1>Feathers, React, and Webpack</h1>
				<form onSubmit={this.handleSubmit}>
					<input placeholder="Message" onChange={this.handleChange}/> <button type="submit">Send</button>
				</form>
				<ul>
					{this.state.messages.map(m => <li key={m.id}>{m.text}</li>)}
				</ul>
			</div>
		)
	}

	async handleChange (event) {
		this.setState({text: event.target.value})
	}

	async handleSubmit (event) {
		event.preventDefault()
		messagesService.create({text: this.state.text})
	}

	async componentDidMount () {
		this.setState({messages: await messagesService.find()})

		messagesService.on('created', message => {
			this.setState({messages: this.state.messages.concat([message])})
		})
	}
}
