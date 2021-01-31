const router = require('express').Router()
const UserModel = require('../model/UserModel')
const Joi = require('joi')

//This route return user, if present in DB
router.get('/:username/:password', async (req, res) => {
	try {
		//finding user by username and password
		const user = await UserModel.findOne({
			username: req.params.username,
			password: req.params.password
		})
		//if user not found return error
		if (!user) {
			res.send({ msg: 'Username or Password is incorrect' })
			return
		}
		//if user found, return id, username, name
		res.status(200).send({
			id: user._id,
			name: user.name,
			username: user.username
		})
	} catch (err) {
		res.status(400).send(err)
	}
})

//This route is for updating password,
//password is lost
router.put('/forget', async (req, res) => {
	try {
		//finding user by username and recover text,
		//then updates the password
		const user = await UserModel.findOneAndUpdate(
			{
				username: req.body.username,
				recover: req.body.recover
			},
			{ password: req.body.password }
		)

		//if user not found return error
		if (!user) return res.send({ msg: 'Username is incorrect' })

		res.status(200).send({ msg: 'Password Updated' })
	} catch (error) {}
})

//This route is for adding user
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

	//initailizing new UserModel for inserting in DB
	const user = new UserModel({
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		recover: req.body.recover
	})

	try {
		//Saving the user into DB
		await user.save()
		res.status(200).send({ msg: 'User added!' })
	} catch (err) {
		res.send({
			msg: err.code == 11000 ? 'This username already exits' : 'Error'
		})
	}
})

module.exports = router
