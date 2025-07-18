const express = require('express');
const FAQ = require('../models/FAQ');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const validate = require('../middleware/validate');
const Joi = require('joi');

const router = express.Router();

const faqCreateSchema = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
  language: Joi.string().valid('en', 'ar').required(),
});

const faqUpdateSchema = Joi.object({
  question: Joi.string(),
  answer: Joi.string(),
  language: Joi.string().valid('en', 'ar'),
});

// Get all FAQs (public, optional ?lang=en|ar)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.lang ? { language: req.query.lang } : {};
    const faqs = await FAQ.find(filter);
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching FAQs', error: err.message });
  }
});

// Create FAQ (admin)
router.post('/', auth, role('admin'), validate(faqCreateSchema), async (req, res) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json(faq);
  } catch (err) {
    res.status(500).json({ message: 'Error creating FAQ', error: err.message });
  }
});

// Update FAQ (admin)
router.put('/:id', auth, role('admin'), validate(faqUpdateSchema), async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faq) return res.status(404).json({ message: 'Not found' });
    res.json(faq);
  } catch (err) {
    res.status(500).json({ message: 'Error updating FAQ', error: err.message });
  }
});

// Delete FAQ (admin)
router.delete('/:id', auth, role('admin'), async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'FAQ deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting FAQ', error: err.message });
  }
});

module.exports = router;