import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography, TextField, Button, Alert, MenuItem, Grid, CircularProgress } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const serviceOptions = [
  { en: 'Cognitive Behavioral Therapy', ar: 'العلاج السلوكي المعرفي' },
  { en: 'Family Counseling', ar: 'الإرشاد الأسري' },
  { en: 'Child & Adolescent Therapy', ar: 'علاج الأطفال والمراهقين' },
  { en: 'Addiction Treatment', ar: 'علاج الإدمان' },
  { en: 'Couples Therapy', ar: 'علاج الأزواج' },
];

// Example: 9am to 5pm, every 1 hour
const allTimeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00'
];

const Booking = () => {
  const { user } = useContext(AuthContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      // Save intended service to localStorage
      if (state?.service) {
        localStorage.setItem('pendingService', state.service);
      }
      navigate('/signup', { state: { from: '/booking' } });
    }
  }, [user, state, navigate]);

  // Restore pending service after login/signup
  useEffect(() => {
    if (user && !state?.service) {
      const pendingService = localStorage.getItem('pendingService');
      if (pendingService) {
        setForm(f => ({ ...f, service: pendingService }));
        localStorage.removeItem('pendingService');
      }
    }
  }, [user, state]);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    service: state?.service || '',
    date: '',
    time: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Fetch booked slots for selected date & service
  useEffect(() => {
    if (form.date && form.service) {
      setLoadingSlots(true);
      axios.get('/api/booking', {
        headers: { Authorization: `Bearer ${user?.token}` }
      }).then(res => {
        // Filter bookings for the selected date & service
        const slots = res.data
          .filter(b =>
            b.date.slice(0, 10) === form.date &&
            b.service === form.service
          )
          .map(b => b.time);
        setBookedSlots(slots);
        setLoadingSlots(false);
      }).catch(() => setBookedSlots([]));
    }
  }, [form.date, form.service, user]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('/api/booking', form, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setSuccess(isArabic ? 'تم الحجز بنجاح' : 'Booking successful!');
      setForm(f => ({ ...f, phone: '', date: '', time: '' }));
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    }
  };

  // Fetch user's own bookings
  const [myBookings, setMyBookings] = useState([]);
  useEffect(() => {
    if (user) {
      axios.get('/api/booking/my', {
        headers: { Authorization: `Bearer ${user.token}` }
      }).then(res => setMyBookings(res.data));
    }
  }, [user, success]);

  return (
    <Box maxWidth={600} mx="auto" mt={5}>
      <Typography variant="h5" mb={2}>{isArabic ? 'حجز موعد' : 'Book an Appointment'}</Typography>
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
          select
          label={isArabic ? 'نوع الخدمة' : 'Service'}
          name="service"
          value={form.service}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {serviceOptions.map(option => (
            <MenuItem key={option.en} value={isArabic ? option.ar : option.en}>
              {isArabic ? option.ar : option.en}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label={isArabic ? 'التاريخ' : 'Date'}
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <Box mt={2} mb={2}>
          <Typography variant="subtitle1" mb={1}>
            {isArabic ? 'اختر الوقت المتاح' : 'Select Available Time'}
          </Typography>
          {loadingSlots ? (
            <CircularProgress size={24} />
          ) : (
            <Grid container spacing={1}>
              {allTimeSlots.map(slot => (
                <Grid item key={slot}>
                  <Button
                    variant={form.time === slot ? 'contained' : 'outlined'}
                    color={bookedSlots.includes(slot) ? 'secondary' : 'primary'}
                    disabled={bookedSlots.includes(slot)}
                    onClick={() => setForm(f => ({ ...f, time: slot }))}
                  >
                    {slot}
                  </Button>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={!form.time}>
          {isArabic ? 'احجز الآن' : 'Book Now'}
        </Button>
      </form>

      {/* User's own bookings */}
      <Box mt={5}>
        <Typography variant="h6" mb={2}>
          {isArabic ? 'حجوزاتي' : 'My Bookings'}
        </Typography>
        {myBookings.length === 0 ? (
          <Typography color="text.secondary">
            {isArabic ? 'لا توجد حجوزات بعد.' : 'No bookings yet.'}
          </Typography>
        ) : (
          <ul>
            {myBookings.map(b => (
              <li key={b._id}>
                {isArabic ? b.service : b.service} - {b.date.slice(0, 10)} - {b.time}
              </li>
            ))}
          </ul>
        )}
      </Box>
    </Box>
  );
};

export default Booking;