const mongoose = require('mongoose')
const express = require('express')
const http = require('http')
const app = express()
const cors = require('cors')
const {
	addUser,
	removeUser,
	getUserById,
	getUsersInRoom,
	getAllRoom
} = require('./userHelper')

const server = http.createServer(app)
const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['GET']
	}
})

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

		if (error) {
			callback({ error: 'already Online!!!' })
		} else {
			socket.emit('online', { username: user.username })
		}

		const rooms = getAllRoom()

		const activeFriendRooms = []
		friends.forEach(friend => {
			rooms.forEach(room => {
				if (room === friend.username) {
					activeFriendRooms.push(room)
				}
			})
		})

		if (activeFriendRooms.length > 0) {
			socket.join(activeFriendRooms)
			activeFriendRooms.forEach(room => {
				socket.emit('friendOnline', { username: room })
				socket.broadcast
					.to(room)
					.emit('friendOnline', { username: username })
			})
		} else {
			socket.join(username)
			socket.broadcast
				.to(username)
				.emit('friendOnline', { username: username })
		}
	})

	socket.on('offline', ({ username }) => {
		socket.broadcast.emit('friendDisconnect', { username: username })

		removeUser(username)
	})
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
