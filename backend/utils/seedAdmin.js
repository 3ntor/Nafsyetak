const User = require('../models/User');

async function seedAdmin() {
  const adminEmail = 'admin@nafsyetak.com';
  const adminPassword = 'admin1234';
  const adminName = 'Admin';
  const adminPhone = '0000000000';

  const existing = await User.findOne({ email: adminEmail });
  if (!existing) {
    await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      phone: adminPhone,
      role: 'admin',
    });
    console.log('Admin account seeded');
  } else {
    console.log('Admin account already exists');
  }
}

module.exports = seedAdmin;