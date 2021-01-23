const router = require('express').Router()
const UserModel = require('../model/UserModel')
const Joi = require('joi')

router.get('/:username', async (req, res) => {
	try {
		const user = await UserModel.findOne({ username: req.param.username })

		if (!user) return res.status(404).send({ msg: 'Did not match!' })

		res.status(200).send({ username: user.username })
	} catch (error) {}
})

router.post('/', async (req, res) => {})

module.exports = router
