require('dotenv/config')
const supertest = require('supertest')
const tap = require('tap')

const app = require('../lib/server/app')

tap.test('app', async t => {
	await t.test('GET /', async t => {
		await t.test(`responsds with '<title>Feathers, React, and Webpack</title>'`, async t => {
			// const body = '<h1>Express</h1>\n'
			await supertest(app)
				.get('/')
				.expect(200, /<title>Feathers, React, and Webpack<\/title>/)
		})
	})

	await t.test('GET /api/messages/1', async t => {
		await t.test(`responsds with 'Hello, $NAME!'`, async t => {
			const body = JSON.stringify(`Hello, ${process.env.NAME}!`)
			await supertest(app)
				.get('/api/messages/1')
				.expect(200, body)
		})
	})
})
