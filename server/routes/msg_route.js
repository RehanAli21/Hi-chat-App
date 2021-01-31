const router = require('express').Router()
const UserModel = require('../model/UserModel')

//This route insert messages into DB of
//messsage sender and receiver.
router.post('/', async (req, res) => {
	try {
		//Finding the user which send the message
		const senderUser = await UserModel.findOne({
			username: req.body.sender
		})

		//if sender user not found, then return error
		if (!senderUser) return res.send({ msg: 'sender username is wrong' })

		//Finding the user which receive the message
		const receiverUser = await UserModel.findOne({
			username: req.body.receiver
		})

		//if receiver user not found, then return error
		if (!receiverUser)
			return res.send({ msg: 'receiver username is wrong' })

		//now getting friends array from users data
		const senderFriends = senderUser.friends
		const receiverFriends = receiverUser.friends

		//if sender has receiver as friends,
		//then insert msg into msgs array
		senderFriends.forEach(friend => {
			if (friend.username === receiverUser.username) {
				friend.msgs.push(req.body.msg)
			}
		})

		//if receiver has sender as friends,
		//then insert msg into msgs array
		receiverFriends.forEach(friend => {
			if (friend.username === senderUser.username) {
				friend.msgs.push(req.body.msg)
			}
		})

		//now updating sender data's friend array
		await senderUser.updateOne({ friends: senderFriends })

		//now updating receiver data's friend array
		await receiverUser.updateOne({ friends: receiverFriends })

		res.send({ msg: 'message sended successfully' })
	} catch (error) {
		res.send({ msg: error })
	}
})

module.exports = router
