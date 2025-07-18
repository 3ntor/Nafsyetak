import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      axios.get('/api/booking/my', {
        headers: { Authorization: `Bearer ${user.token}` }
      })
        .then(res => setBookings(res.data))
        .catch(() => setError(isArabic ? 'حدث خطأ أثناء جلب الحجوزات' : 'Failed to fetch bookings'));
    }
  }, [user, isArabic]);

  return (
    <Box maxWidth={800} mx="auto" mt={5}>
      <Typography variant="h4" mb={3} align="center">
        {isArabic ? 'حجوزاتي' : 'My Bookings'}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {bookings.length === 0 ? (
        <Typography align="center" color="text.secondary">
          {isArabic ? 'لا توجد حجوزات بعد.' : 'No bookings yet.'}
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{isArabic ? 'الخدمة' : 'Service'}</TableCell>
                <TableCell>{isArabic ? 'التاريخ' : 'Date'}</TableCell>
                <TableCell>{isArabic ? 'الوقت' : 'Time'}</TableCell>
                <TableCell>{isArabic ? 'الحالة' : 'Status'}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map(b => (
                <TableRow key={b._id}>
                  <TableCell>{b.service}</TableCell>
                  <TableCell>{b.date.slice(0, 10)}</TableCell>
                  <TableCell>{b.time}</TableCell>
                  <TableCell>{isArabic
                    ? b.status === 'pending' ? 'قيد الانتظار'
                      : b.status === 'confirmed' ? 'مؤكد'
                      : b.status === 'cancelled' ? 'ملغي'
                      : b.status
                    : b.status.charAt(0).toUpperCase() + b.status.slice(1)
                  }</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default MyBookings;