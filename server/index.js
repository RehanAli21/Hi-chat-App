const mongoose = require('mongoose')
const express = require('express')
const http = require('http')
const app = express()
const cors = require('cors')
const {
	addUser,
	removeUser,
	getUserById,
	getUserByUsername,
	getUsersInRoom
} = require('./userHelper')

const server = http.createServer(app)
const io = require('socket.io')(server)

const router = require('./router')

//middlewares
app.use(express.json())
app.use(cors())
app.use(router)

io.on('connection', socket => {
	socket.on('join', ({ username, friends }, callback) => {
		const { error, user } = addUser({
			id: socket.id,
			username,
			room: username
		})

		if (error) return callback({ error: 'error' })

		socket.emit('online', { username: user.username, text: 'I am Online' })

		socket.broadcast.to(username).emit('online', {
			username: user.username,
			text: `${username} is online`
		})

		const rooms = []
		friends.forEach(friend => {
			const presentUser = getUserByUsername(friend.username)
			if (presentUser) {
				rooms.push(presentUser.room)
			}
		})

		socket.join(rooms)
	})
	socket.on('disconnect', () => console.log('Disconnected'))
})

//connection to mongodb
mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true)
mongoose.connect(
	'mongodb://localhost:27017/Hi',
	{ useNewUrlParser: true },
	() => console.log('Mongodb Connected')
)

const port = process.env.PORT || 5000
server.listen(port, () => console.log(`${port}`))
