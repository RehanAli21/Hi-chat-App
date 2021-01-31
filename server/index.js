const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv')
const http = require('http')
const app = express()
const cors = require('cors')
const { addUser, removeUser, getAllRoom } = require('./userHelper')

const server = http.createServer(app)
const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['GET']
	}
})

const router = require('./router')

//middlewares
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(router)

//This is for connecting User to Front-End
io.on('connection', socket => {
	//This event runs when user emit join event on Front-End
	socket.on('join', ({ username, friends }) => {
		//Adding user into users array, which tracks which users are connected
		const { error, user } = addUser({
			id: socket.id,
			username,
			room: username
		})

		//Getting all the rooms from users array to check,
		//If users friends is online/connected ot not
		const rooms = getAllRoom()

		//Searching the friends in the rooms array,
		//If friend is found then copy it to activeFriendRooms
		const activeFriendRooms = []
		friends.forEach(friend => {
			rooms.forEach(room => {
				if (room === friend.username) {
					activeFriendRooms.push(room)
				}
			})
		})

		//Joining Room which Own Username
		socket.join(username)

		//If friends in online/connected
		if (activeFriendRooms.length > 0) {
			//Join all the online/connected friends rooms
			socket.join(activeFriendRooms)

			//The friendOnline event tells users and their friends,
			//that who is online.

			//For emiting friendOnline event on every room
			activeFriendRooms.forEach(room => {
				//Sending user the room (friends) which is online
				socket.emit('friendOnline', { username: room })

				//sending user to all online/connected rooms (friends)
				socket.broadcast
					.to(room)
					.emit('friendOnline', { username: username })
			})
		} else {
			//If no friend is online/connected,
			//then, send user room joined persons (if any) the user
			socket.broadcast.emit('friendOnline', { username: username })
		}
	})

	//Receiving message event from front-end
	socket.on('message', ({ sender, receiver, msg }) => {
		//Getting all the rooms from users array,
		//To check if the user which will receive
		//message is online/connected or not.
		const rooms = getAllRoom()

		//Checking if receiver (the user which will receive msg)
		//is online by room,
		rooms.forEach(room => {
			if (room == receiver) {
				//if receiver is online,
				//then emiting message to that user
				socket.broadcast.to(room).emit('message', { sender, msg })
			}
		})
	})

	//Receiving offline event from front-end,
	//receiving this event means user is now offline.
	socket.on('offline', ({ username }) => {
		//Telling other user that this user is now offline,
		//By emiting frinedDisconnect event to all other users,
		//which joined this user room
		socket.broadcast.emit('friendDisconnect', { username: username })

		//Removing the user from users array (which tracks online users)
		removeUser(username)
	})
})

//connection to mongodb
mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.Hi_app_DB, { useNewUrlParser: true }, () =>
	console.log('Mongodb Connected')
)

const port = process.env.PORT || 5000
server.listen(port, () => console.log(`${port}`))
