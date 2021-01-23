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
	requests: {
		type: Array
	}
})

module.exports = mongoose.model('User', UserSchema)
