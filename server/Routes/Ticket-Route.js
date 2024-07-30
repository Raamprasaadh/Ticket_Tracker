/* eslint-disable no-undef */
const { getAllTickets, createTicket, editTicket, deleteTicket} = require('../Controllers/Ticket-Controller')
const router = require('express').Router()

router.get('/getAllTickets', getAllTickets)
router.put('/editTicket', editTicket)
router.post('/createTicket', createTicket)
router.delete('/deleteTicket/:id', deleteTicket)


module.exports = router