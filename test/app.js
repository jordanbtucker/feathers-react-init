require('dotenv/config')
const assert = require('assert')
const supertest = require('supertest')
const tap = require('tap')

const app = require('../lib/server/app')

tap.test('app', async t => {
	await t.test('GET /', async t => {
		await t.test(`responds with '<title>Feathers, React, and Webpack</title>'`, async t => {
			await supertest(app)
				.get('/')
				.expect(200, /<title>Feathers, React, and Webpack<\/title>/)
		})
	})

	await t.test('GET /api/messages', async t => {
		await t.test(`responds with messages`, async t => {
			const text = `Hello, ${process.env.NAME}!`
			const res = await supertest(app)
				.get('/api/messages')
				.expect(200)

			assert.strictEqual(res.body.length, 1)
			assert.strictEqual(res.body[0].text, text)
		})
	})
})
