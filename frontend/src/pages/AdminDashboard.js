import React, { useEffect, useState, useContext } from 'react';
import {
  Box, Typography, Tabs, Tab, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, Alert, Chip
} from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const headers = { Authorization: `Bearer ${user.token}` };
    axios.get('/api/user', { headers }).then(res => setUsers(res.data)).catch(() => setUsers([]));
    axios.get('/api/booking', { headers }).then(res => setBookings(res.data)).catch(() => setBookings([]));
    axios.get('/api/blog', { headers }).then(res => setBlogs(res.data)).catch(() => setBlogs([]));
  }, [user.token, success]);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/api/user/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
      setUsers(users.filter(u => u._id !== id));
      setSuccess('User deleted');
    } catch {
      setError('Failed to delete user');
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`/api/booking/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
      setBookings(bookings.filter(b => b._id !== id));
      setSuccess('Booking deleted');
    } catch {
      setError('Failed to delete booking');
    }
  };

  const handleConfirmBooking = async (id) => {
    try {
      await axios.put(`/api/booking/${id}`, { status: 'confirmed' }, { headers: { Authorization: `Bearer ${user.token}` } });
      setSuccess('Booking confirmed');
      setBookings(bookings.map(b => b._id === id ? { ...b, status: 'confirmed' } : b));
    } catch {
      setError('Failed to confirm booking');
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      await axios.put(`/api/booking/${id}`, { status: 'cancelled' }, { headers: { Authorization: `Bearer ${user.token}` } });
      setSuccess('Booking cancelled');
      setBookings(bookings.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
    } catch {
      setError('Failed to cancel booking');
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`/api/blog/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
      setBlogs(blogs.filter(a => a._id !== id));
      setSuccess('Blog deleted');
    } catch {
      setError('Failed to delete blog');
    }
  };

  return (
    <ProtectedRoute role="admin">
      <Box p={4}>
        <Typography variant="h4" mb={3}>Admin Dashboard</Typography>
        {error && <Alert severity="error" onClose={() => setError('')}>{error}</Alert>}
        {success && <Alert severity="success" onClose={() => setSuccess('')}>{success}</Alert>}
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label="Users" />
          <Tab label="Bookings" />
          <Tab label="Blogs" />
        </Tabs>

        {/* Users */}
        {tab === 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(u => (
                  <TableRow key={u._id}>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <Chip label={u.role} color={u.role === 'admin' ? 'secondary' : 'primary'} />
                    </TableCell>
                    <TableCell>{u.phone}</TableCell>
                    <TableCell>
                      {u.role !== 'admin' && (
                        <Button color="error" onClick={() => handleDeleteUser(u._id)}>Delete</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Bookings */}
        {tab === 1 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map(b => (
                  <TableRow key={b._id}>
                    <TableCell>{b.user?.name || 'N/A'}</TableCell>
                    <TableCell>{b.service}</TableCell>
                    <TableCell>{new Date(b.date).toLocaleDateString()}</TableCell>
                    <TableCell>{b.time}</TableCell>
                    <TableCell>
                      <Chip
                        label={b.status}
                        color={
                          b.status === 'pending' ? 'warning'
                            : b.status === 'confirmed' ? 'success'
                            : b.status === 'cancelled' ? 'error'
                            : 'default'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {b.status !== 'confirmed' && (
                        <Button color="success" onClick={() => handleConfirmBooking(b._id)}>Confirm</Button>
                      )}
                      {b.status !== 'cancelled' && (
                        <Button color="warning" onClick={() => handleCancelBooking(b._id)}>Cancel</Button>
                      )}
                      <Button color="error" onClick={() => handleDeleteBooking(b._id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Blogs */}
        {tab === 2 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.map(blog => (
                  <TableRow key={blog._id}>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.author?.name || 'Admin'}</TableCell>
                    <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button color="error" onClick={() => handleDeleteBlog(blog._id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
