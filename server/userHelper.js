//This array tracks the online/connected users
let users = []

//This function return all the online/connected
//users rooms array
const getAllRoom = () => {
	const rooms = []
	users.forEach(user => {
		rooms.push(user.room)
	})
	return rooms
}

//This function add user to the users array
const addUser = ({ id, username, room }) => {
	//first remove all spaces and convert
	//them into lower case alphabets
	username = username.trim().toLowerCase()
	room = room.trim().toLowerCase()

	//checking is user is already in users array,
	//which means that user is already online/connected.
	const existingUser = users.find(
		user => user.room === room && user.username === username
	)
	//If user is alreay present, then return error msg.
	if (existingUser) return { error: 'Username is Taken' }

	//object, that will go into users array
	const user = { id, username, room }
	//pushing object into users array
	users.push(user)

	//returning the pushed user
	return { user }
}

//This function remove user from the users array
const removeUser = ({ username }) => {
	//filter/removing the user from users array,
	//whose username is save as user room (because rooms and username are same)
	const temp = []
	users.forEach(user => {
		if (user.room !== username) {
			temp.push(user)
		}
	})
	//then access the temp array into users array
	users = temp
}

module.exports = { addUser, removeUser, getAllRoom }
