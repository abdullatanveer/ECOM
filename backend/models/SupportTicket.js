const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    dateIssued: {
        type: Date,
        required: true,
        default: Date.now,
    },
    orderNumber: String, // Optional field
    type: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true,
    },
    status: {
        type: String,
        enum: ['Open', 'Closed', 'In Progress'],
        required: true,
    },
    description:{
        type:String,
    },
    supportAgentResponses: [
    {
      message: String,
      dateTime : Date
    },
  ],
});

module.exports = mongoose.model('SupportTicket', supportTicketSchema);
