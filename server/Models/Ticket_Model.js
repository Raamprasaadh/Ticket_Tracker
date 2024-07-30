/* eslint-disable no-undef */
const mongoose = require("mongoose");


const TicketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Your Title is required"],
    minlength: [3, 'Description must be at least 3 characters long'],
  },
  description: {
    type: String,
    required: [true, "Your Description is required"],
    minlength: [3, 'Description must be at least 3 characters long'], 
    maxlength: [100, 'Description cannot exceed 100 characters'] 
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});


module.exports = mongoose.model("Ticket", TicketSchema);