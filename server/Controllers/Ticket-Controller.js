/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require("mongoose");
const Ticket = require("../Models/Ticket_Model");


module.exports.getAllTickets = async (req,res) => {
    try {
        const tickets = await Ticket.find(); // Retrieve all tickets
        return res.status(200).json(tickets);
    } catch (error) {
      console.error(error);
    }
  };

  // Create a new ticket
 module.exports.createTicket= async function(req, res) {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).json(ticket);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ message: error.message });
    }
}

// Update a ticket
module.exports.editTicket = async function(req, res) {
    const { id } = req.body;
    // const objId = require('mongod').ObjectId;
    // const objectId = new objId(id);
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID format', id, req);
          }
        const ticket = await Ticket.findByIdAndUpdate({_id:id?.toString().trim()}, req?.body);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ message: error.message });
    }
}

// Delete a ticket
module.exports.deleteTicket=async function(req, res) {
    const { id } = req.params;
    try {
        const ticket = await Ticket.findByIdAndDelete(id.toString().trim());
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found', });
        }
        res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
