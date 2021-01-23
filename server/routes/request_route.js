const router = require('express').Router()
const UserModel = require('../model/UserModel')

//for getting requests array from data
router.get('/:id', async (req, res) => {
	try {
		//taking data from user to see request data
		const user = await UserModel.findOne({ _id: req.params.id })

		if (!user) return res.status(404).send({ msg: 'User not found' })

		//sended request data
		res.status(200).send({ requests: user.requests })
	} catch (err) {
		res.status(400).send({ msg: 'error' })
	}
})

//for finding user by username
router.get('/:username', async (req, res) => {
	try {
		//finding the user to which we want to send request by its username
		const user = await UserModel.findOne({ username: req.params.username })

		if (!user)
			return res.status(404).send({ msg: 'Username did not match!' })

		//checking if request already sended
		user.requests.forEach(request => {
			if (request.username === req.body.username)
				return res.send({ msg: 'Already Requested' })
		})

		res.status(200).send({ name: user.name, username: user.username })
	} catch (error) {
		return res.status(400).send({ msg: 'error' })
	}
})

//for sending requests
router.put('/', async (req, res) => {
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

		//checking if user already sended the request
		currentUser.requests.forEach(request => {
			if (request.username === req.body.username)
				return res.send({ msg: 'Already Requested' })
		})

		//adding the request in current user data,
		//so the request can't be sended again
		//if send is true means this user sended request
		//else this user received request
		await UserModel.findOneAndUpdate(
			{ _id: req.body.id },
			{
				$push: {
					requests: {
						username: req.body.username,
						name: req.body.name,
						send: true
					}
				}
			}
		)

		//adding the request in requested user data
		//so the user can know that he has a friend request
		//if send is true means this user sended request
		//else this user received request
		await UserModel.findOneAndUpdate(
			{ username: req.body.username },
			{
				$push: {
					requests: {
						username: req.body.username,
						name: req.body.name,
						send: false
					}
				}
			}
		)

		res.status(200).send({ msg: 'Request has been send' })
	} catch (err) {
		return res.status(400).send({ msg: 'error' })
	}
})

module.exports = router
