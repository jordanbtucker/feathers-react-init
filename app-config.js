const defaultServerPort = process.env.NODE_ENV === 'production' ? 3000 : 3001
const defaultClientPort = 3000
const defaultHost = 'localhost'

const serverPort = process.env.SERVER_PORT || process.env.PORT || defaultServerPort
const serverHost = process.env.SERVER_HOST || process.env.HOST || defaultHost
const clientPort = process.env.CLIENT_PORT || defaultClientPort
const clientHost = process.env.CLIENT_HOST || serverHost

module.exports = {
	serverPort,
	serverHost,
	clientPort,
	clientHost,
}
