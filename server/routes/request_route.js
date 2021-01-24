const router = require('express').Router()
const UserModel = require('../model/UserModel')

//for getting received requests
router.get('/received/:id', async (req, res) => {
	try {
		//taking data from user to see request data
		const user = await UserModel.findOne({ _id: req.params.id })

		if (!user) return res.status(404).send({ msg: 'User not found' })

		//sended request data
		res.status(200).send({ request_received: user.request_received })
	} catch (err) {
		res.status(400).send({ msg: 'error' })
	}
})

//for getting sended requests
router.get('/sended/:id', async (req, res) => {
	try {
		//taking data from user to see request data
		const user = await UserModel.findOne({ _id: req.params.id })

		if (!user) return res.status(404).send({ msg: 'User not found' })

		//sended request data
		res.status(200).send({ request_sended: user.request_sended })
	} catch (err) {
		res.status(400).send({ msg: 'error' })
	}
})

//for finding user by username
router.get('/:username', async (req, res) => {
	try {
		//finding the user to which we want to send request by its username
		const user = await UserModel.findOne({ username: req.params.username })

		if (!user) return res.send({ msg: 'Username did not match!' })

		//checking if request already sended
		user.request_sended.forEach(request => {
			if (request.username === req.body.username)
				return res.send({ msg: 'Already Requested' })
		})

		res.status(200).send({ name: user.name, username: user.username })
	} catch (error) {
		return res.status(400).send({ msg: 'error' })
	}
})

//for sending requests
router.put('/send', async (req, res) => {
	try {
		//Finding Current User
		const currentUser = await UserModel.findOne({ _id: req.body.id })

		//Finding the User we want to send request
		const requestedUser = await UserModel.findOne({
			username: req.body.username
		})

		//checking if user and requested user is found or not
		if (!currentUser || !requestedUser)
			return res.status(404).send({ msg: 'Error' })

		if (currentUser.username === requestedUser.username)
			return res.send({ msg: 'You can not send request to yourself' })

		//checking if user already sended the request
		currentUser.request_sended.forEach(request => {
			if (request.username === req.body.username) {
				throw Error
			}
		})

		//adding the request into current user data,
		//so the request can't be sended again
		await currentUser.updateOne({
			$push: {
				request_sended: {
					username: requestedUser.username,
					name: requestedUser.name
				}
			}
		})

		//adding the request into requested user's data
		//so the user can know that he has a friend request
		await requestedUser.updateOne({
			$push: {
				request_received: {
					username: currentUser.username,
					name: currentUser.name
				}
			}
		})

		res.status(200).send({ msg: 'Request has been send' })
	} catch (err) {
		return res.status(400).send({ msg: 'error' })
	}
})

//for accepting the request for adding friend
router.put('/add', async (req, res) => {
	try {
		const receiver = await UserModel.findOne({ _id: req.body.id })
		const sender = await UserModel.findOne({ username: req.body.username })

		//first it remove the request sender data from
		//requested user's requset_received array, then
		//it adds sender data into friends array of requested_user
		await receiver.updateOne({
			$pull: {
				request_received: {
					username: sender.username,
					name: sender.name
				}
			},
			$push: {
				friends: {
					username: sender.username,
					name: sender.name
				}
			}
		})

		//first it remove the request receiver data from
		//sender user's requset_received array, then
		//it adds receiver data into friends array of sender
		await sender.updateOne({
			$pull: {
				request_sended: {
					username: receiver.username,
					name: receiver.name
				}
			},
			$push: {
				friends: {
					username: receiver.username,
					name: receiver.name
				}
			}
		})

		res.status(200).send({ msg: `Now you are friend with ${sender.name}` })
	} catch (error) {
		res.send({ msg: 'error' })
	}
})

router.put('/remove', async (req, res) => {
	try {
		const receiver = await UserModel.findOne({ _id: req.body.id })
		const sender = await UserModel.findOne({ username: req.body.username })

		//It Remove the request sender data from
		//requested user's requset_received array
		await receiver.updateOne({
			$pull: {
				request_received: {
					username: sender.username,
					name: sender.name
				}
			}
		})

		//It removes the request receiver data from
		//sender user's requset_received array
		await sender.updateOne({
			$pull: {
				request_sended: {
					username: receiver.username,
					name: receiver.name
				}
			}
		})

		res.status(200).send({
			msg: `Request from ${sender.name} has been removed`
		})
	} catch (error) {
		res.send({ msg: 'error' })
	}
})

module.exports = router
