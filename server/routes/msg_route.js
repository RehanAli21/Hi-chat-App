const router = require('express').Router()
const UserModel = require('../model/UserModel')

router.post('/', async (req, res) => {
	try {
		const senderUser = await UserModel.findOne({
			username: req.body.sender
		})

		if (!senderUser) return res.send({ msg: 'sender username is wrong' })

		const receiverUser = await UserModel.findOne({
			username: req.body.receiver
		})

		if (!receiverUser) return res.send({ msg: 'sender username is wrong' })

		const senderFriends = senderUser.friends
		const receiverFriends = receiverUser.friends

		senderFriends.forEach(friend => {
			if (friend.username === receiverUser.username) {
				friend.msgs.push(req.body.msg)
			}
		})

		receiverFriends.forEach(friend => {
			if (friend.username === senderUser.username) {
				friend.msgs.push(req.body.msg)
			}
		})

		await senderUser.updateOne({ friends: senderFriends })

		await receiverUser.updateOne({ friends: receiverFriends })

		res.send({ msg: 'message sended successfully' })
	} catch (error) {
		res.send({ msg: error })
	}
})

module.exports = router
