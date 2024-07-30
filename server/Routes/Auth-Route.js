/* eslint-disable no-undef */
const { Signup, Login} = require('../Controllers/Auth-Controller')
const router = require('express').Router()

router.post('/signup', Signup)
router.post('/login', Login)

module.exports = router