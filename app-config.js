const DEFAULT_PORT = 3000
const DEFAULT_HOST = 'localhost'

const port = process.env.PORT || DEFAULT_PORT
const host = process.env.HOST || DEFAULT_HOST

module.exports = {
	port,
	host,
}
