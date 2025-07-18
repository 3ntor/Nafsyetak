const express = require('express');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const validate = require('../middleware/validate');
const Joi = require('joi');

const router = express.Router();

const blogCreateSchema = Joi.object({
  title: Joi.string().min(2).max(200).required(),
  content: Joi.string().min(10).required(),
});

const blogUpdateSchema = Joi.object({
  title: Joi.string().min(2).max(200),
  content: Joi.string().min(10),
});

// Get all blogs (public)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name email');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs', error: err.message });
  }
});

// Get single blog (public)
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    if (!blog) return res.status(404).json({ message: 'Not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog', error: err.message });
  }
});

// Create blog (admin)
router.post('/', auth, role('admin'), validate(blogCreateSchema), async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.create({
      title,
      content,
      author: req.user.id,
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error creating blog', error: err.message });
  }
});

// Update blog (admin)
router.put('/:id', auth, role('admin'), validate(blogUpdateSchema), async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ message: 'Not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error updating blog', error: err.message });
  }
});

// Delete blog (admin)
router.delete('/:id', auth, role('admin'), async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog', error: err.message });
  }
});

module.exports = router;