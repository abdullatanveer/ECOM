
const express = require('express');
const router = express.Router();
const SupportTicket = require('../models/SupportTicket');

router.get('/', (req, res) => {
    res.send('Hello from support ticket routes!');
});


// Create a new support ticket
router.post('/support-tickets', async (req, res) => {
    try {
        const newTicket = new SupportTicket(req.body);
        const savedTicket = await newTicket.save();
        res.status(201).json(savedTicket);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all support tickets
router.get('/support-tickets', async (req, res) => {
    try {
        const tickets = await SupportTicket.find();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a support ticket by ID
router.get('/support-tickets/:id', async (req, res) => {
    try {
        const ticket = await SupportTicket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// .. Old before adding response filed option Update a support ticket by ID ,  can be used on the user side if user want to update 
// Both these methods to update are working but the data being sent from the client in different format ..
/*
router.put('/support-tickets/:id', async (req, res) => {
    try {
        const updatedTicket = await SupportTicket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTicket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.json(updatedTicket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

*/

// Update a support ticket by ID, changing status and adding a support agent response
router.put('/support-tickets/:id', async (req, res) => {
  try {
    const { message, status } = req.body;

    const ticket = await SupportTicket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    if (status) {
      ticket.status = status;
    }
    if (message && message.length !== 0){
        const newResponse = {
        message,
        dateTime: new Date(), 
    };

    ticket.supportAgentResponses.push(newResponse);

    }
    
    const updatedTicket = await ticket.save();

    res.json(updatedTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete a support ticket by ID
router.delete('/support-tickets/:id', async (req, res) => {
    try {
        const deletedTicket = await SupportTicket.findByIdAndDelete(req.params.id);
        if (!deletedTicket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.json({ message: 'Ticket deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
