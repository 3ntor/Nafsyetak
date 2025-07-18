import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const clinicInfo = {
  address_en: "123 Clinic Street, Cairo, Egypt",
  address_ar: "١٢٣ شارع العيادة، القاهرة، مصر",
  phone1: "+20 100 123 4567",
  phone2: "+20 100 987 6543",
  doctor_en: "Dr. Ahmed Hassan",
  doctor_ar: "د. أحمد حسن",
  doctor_phone: "+20 100 555 8888",
};

const Contact = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('/api/contact', form);
      setSuccess(isArabic ? 'تم إرسال رسالتك بنجاح!' : 'Your message has been sent!');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(isArabic ? 'حدث خطأ أثناء الإرسال' : 'Failed to send message');
    }
  };

  return (
    <Grid container spacing={4} mt={4}>
      <Grid item xs={12} md={7}>
        <Box maxWidth={500} mx="auto">
          <Typography variant="h4" mb={2}>
            {isArabic ? 'اتصل بنا' : 'Contact Us'}
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label={isArabic ? 'الاسم' : 'Name'}
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label={isArabic ? 'البريد الإلكتروني' : 'Email'}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label={isArabic ? 'رقم الهاتف' : 'Phone'}
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label={isArabic ? 'رسالتك' : 'Message'}
              name="message"
              value={form.message}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              minRows={3}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isArabic ? 'إرسال' : 'Send'}
            </Button>
          </form>
        </Box>
      </Grid>
      <Grid item xs={12} md={5}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" mb={1}>
            {isArabic ? 'معلومات العيادة' : 'Clinic Information'}
          </Typography>
          <Typography>
            <b>{isArabic ? 'العنوان:' : 'Address:'}</b> {isArabic ? clinicInfo.address_ar : clinicInfo.address_en}
          </Typography>
          <Typography>
            <b>{isArabic ? 'الهاتف 1:' : 'Phone 1:'}</b> {clinicInfo.phone1}
          </Typography>
          <Typography>
            <b>{isArabic ? 'الهاتف 2:' : 'Phone 2:'}</b> {clinicInfo.phone2}
          </Typography>
          <Typography mt={2}>
            <b>{isArabic ? 'الطبيب:' : 'Doctor:'}</b> {isArabic ? clinicInfo.doctor_ar : clinicInfo.doctor_en}
          </Typography>
          <Typography>
            <b>{isArabic ? 'هاتف الطبيب:' : 'Doctor Phone:'}</b> {clinicInfo.doctor_phone}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Contact;