const express = require('express');
const ContactMessage = require('../models/ContactMessage');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const validate = require('../middleware/validate');
const Joi = require('joi');

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  message: Joi.string().required(),
});

// Submit contact message (public)
router.post('/', validate(contactSchema), async (req, res) => {
  try {
    const msg = await ContactMessage.create(req.body);
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting message', error: err.message });
  }
});

// Get all messages (admin)
router.get('/', auth, role('admin'), async (req, res) => {
  try {
    const msgs = await ContactMessage.find();
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages', error: err.message });
  }
});

// Delete message (admin)
router.delete('/:id', auth, role('admin'), async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting message', error: err.message });
  }
});

module.exports = router;