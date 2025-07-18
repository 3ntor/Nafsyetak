const express = require('express');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

const router = express.Router();

router.get('/test', auth, role('user'), (req, res) => {
  res.json({ message: 'User access granted', user: req.user });
});

module.exports = router;