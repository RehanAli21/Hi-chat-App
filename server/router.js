const express = require('express')
const router = express.Router()
const userroute = require('./routes/user_route')
const friendroute = require('./routes/friends_route')
const reqroute = require('./routes/request_route')
const msgroute = require('./routes/msg_route')

router.use('/user', userroute)
router.use('/friend', friendroute)
router.use('/request', reqroute)
router.use('/msg', msgroute)

//To show that server is running
router.get('/', (req, res) => {
	res.send('Server is Running!!')
})

module.exports = router
