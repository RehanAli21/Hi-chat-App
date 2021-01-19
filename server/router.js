const express = require('express')
const router = express.Router()
const userroute = require('./routes/user_route')
const friendroute = require('./routes/friends_route')

router.use('/user', userroute)
router.use('/friend', friendroute)

router.get('/', (req, res) => {
	res.send('Hello you are on home')
})

module.exports = router
