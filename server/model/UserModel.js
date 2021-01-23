const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		max: 25,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		min: 8,
		required: true
	},
	recover: {
		type: String,
		required: true
	},
	friends: {
		type: Array
	},
	request_sended: {
		type: Array
	},
	request_received: {
		type: Array
	}
})

module.exports = mongoose.model('User', UserSchema)
