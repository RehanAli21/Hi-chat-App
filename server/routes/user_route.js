const router = require('express').Router()
const UserModel = require('../model/UserModel')
const Joi = require('joi')

router.get('/:username/:password', async (req, res) => {
	try {
		const user = await UserModel.findOne({
			username: req.params.username,
			password: req.params.password
		})
		if (!user) {
			res.status(400).send('Username or Password is incorrect')
			return
		}
		res.status(200).send({
			id: user._id,
			name: user.name,
			username: user.username
		})
	} catch (err) {
		res.status(400).send(err)
	}
})

router.put('/forget', async (req, res) => {
	try {
		const user = await UserModel.findOneAndUpdate(
			{
				username: req.body.username,
				recover: req.body.recover
			},
			{ password: req.body.password }
		)
		if (!user) return res.status(400).send({ msg: 'Username is incorrect' })

		res.status(200).send({ msg: 'Password Updated' })
	} catch (error) {}
})

router.post('/', async (req, res) => {
	//Validation
	const schema = Joi.object({
		name: Joi.string().max(25).required(),
		username: Joi.string().required(),
		password: Joi.string().min(8).required(),
		recover: Joi.string().required()
	})
	//validation before making a user
	const { error } = schema.validate(req.body)

	if (error) {
		res.status(400).send(error.details[0].message)
		return
	}

	const user = new UserModel({
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		recover: req.body.recover
	})

	try {
		await user.save()
		res.status(200).send({ msg: 'User added!' })
	} catch (err) {
		res.status(400).send({
			msg: err.code == 11000 ? 'This username already exits' : 'Error'
		})
	}
})

module.exports = router
