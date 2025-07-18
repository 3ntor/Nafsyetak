const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  language: { type: String, enum: ['en', 'ar'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('FAQ', faqSchema);