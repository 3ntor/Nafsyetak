require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const seedAdmin = require('./utils/seedAdmin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected');
  await seedAdmin();
})
.catch((err) => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

const bookingRoutes = require('./routes/booking');
app.use('/api/booking', bookingRoutes);
const blogRoutes = require('./routes/blog');
app.use('/api/blog', blogRoutes);
const userManageRoutes = require('./routes/userManage');
app.use('/api/user', userManageRoutes);
const faqRoutes = require('./routes/faq');
app.use('/api/faq', faqRoutes);
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// Example: Add protected/admin routes here
// app.use('/api/admin', require('./routes/admin'));

// Placeholder for routes
app.get('/', (req, res) => {
  res.send('Nafsyetak API is running');
});

// Export app for testing
module.exports = app;

// Start server if not in test mode
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

if (!process.env.JWT_SECRET) process.env.JWT_SECRET = 'devsecret';