/* eslint-disable no-undef */
const { Signup, Login, Logout} = require('../Controllers/Auth-Controller')
const router = require('express').Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/logout', Logout)

module.exports = router