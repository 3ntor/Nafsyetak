const express = require('express');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const validate = require('../middleware/validate');
const Joi = require('joi');

const router = express.Router();

const bookingCreateSchema = Joi.object({
  service: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.string().required(),
});

const bookingUpdateSchema = Joi.object({
  service: Joi.string(),
  date: Joi.date(),
  time: Joi.string(),
  status: Joi.string().valid('pending', 'confirmed', 'cancelled'),
});

// Create booking (user)
router.post('/', auth, validate(bookingCreateSchema), async (req, res) => {
  try {
    const { service, date, time } = req.body;
    const booking = await Booking.create({
      user: req.user.id,
      service,
      date,
      time,
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
});

// Get all bookings (admin)
router.get('/', auth, role('admin'), async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// Get my bookings (user)
router.get('/my', auth, role('user'), async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// Update booking (user: own, admin: any)
router.put('/:id', auth, validate(bookingUpdateSchema), async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'admin' && booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    Object.assign(booking, req.body);
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error updating booking', error: err.message });
  }
});

// Delete/cancel booking (user: own, admin: any)
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'admin' && booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    await booking.deleteOne();
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting booking', error: err.message });
  }
});

module.exports = router;