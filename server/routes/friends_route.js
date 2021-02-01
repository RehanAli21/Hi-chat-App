const router = require('express').Router()
const UserModel = require('../model/UserModel')

//This route send the friend array of user from DB
router.get('/:id', async (req, res) => {
	try {
		//Finding User from user id
		const user = await UserModel.findOne({ _id: req.params.id })

		//if user is not found returning error msg
		if (!user) return res.send({ msg: 'User not Found' })

		//else send friends array of user
		res.send({ friends: user.friends })
	} catch (error) {
		res.send({ msg: 'error' })
	}
})

module.exports = router
