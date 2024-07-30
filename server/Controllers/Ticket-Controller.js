/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const Ticket = require("../Models/Ticket_Model");

module.exports.getAllTickets = async () => {
    try {
        const tickets = await Ticket.find(); // Retrieve all tickets
        return tickets;
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
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Update a ticket
module.exports.editTicket = async function(req, res) {
    const { id } = req.params;
    try {
        const ticket = await Ticket.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Delete a ticket
module.exports.deleteTicket=async function(req, res) {
    const { id } = req.params;
    try {
        const ticket = await Ticket.findByIdAndDelete(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json({ message: 'Ticket deleted successfully' });
    } catch (_error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
