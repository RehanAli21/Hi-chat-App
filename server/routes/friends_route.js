const router = require('express').Router()
const UserModel = require('../model/UserModel')

router.get('/:id', async (req, res) => {
	try {
		const user = await UserModel.findOne({ _id: req.params.id })

		if (!user) return res.send({ msg: 'User not Found' })

		res.send({ friends: user.friends })
	} catch (error) {
		res.send({ msg: 'error' })
	}
})

module.exports = router
