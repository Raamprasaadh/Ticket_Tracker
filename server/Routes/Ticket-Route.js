/* eslint-disable no-undef */
const { getAllTickets, createTicket, editTicket, deleteTicket} = require('../Controllers/Ticket-Controller')
const router = require('express').Router()

router.get('/allTickets', getAllTickets)
router.put('/editTicket', editTicket)
router.post('/createTicket', createTicket)
router.delete('/deleteTicket', deleteTicket)


module.exports = router