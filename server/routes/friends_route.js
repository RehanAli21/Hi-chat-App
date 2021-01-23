const router = require('express').Router()
const UserModel = require('../model/UserModel')
const Joi = require('joi')

router.get('/', (req, res) => res.send('you are at friend'))

module.exports = router
