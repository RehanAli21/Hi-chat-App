const { isError } = require('joi')

const users = []

const getAllRoom = () => {
	const rooms = []
	users.forEach(user => {
		rooms.push(user.room)
	})
	return rooms
}

const addUser = ({ id, username, room }) => {
	username = username.trim().toLowerCase()
	room = room.trim().toLowerCase()

	const existingUser = users.find(
		user => user.room === room && user.username === username
	)

	if (existingUser) return { error: 'Username is Taken' }

	const user = { id, username, room }
	users.push(user)

	return { user }
}

const removeUser = ({ id }) => {
	const index = users.findIndex(user => user.id === id)

	if (index !== -1) return users.splice(index, 1)[0]
}

const getUserById = ({ id }) => users.find(user => user.id === id)

const getUsersInRoom = ({ room }) => users.filter(user => user.room === room)

module.exports = {
	addUser,
	removeUser,
	getUserById,
	getUsersInRoom,
	getAllRoom
}
