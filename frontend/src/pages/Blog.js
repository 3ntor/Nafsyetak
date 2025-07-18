import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, Card, CardContent, Button, TextField, Alert } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Blog = () => {
  const { user } = useContext(AuthContext);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all blog posts
  useEffect(() => {
    axios.get('/api/blog')
      .then(res => setPosts(res.data))
      .catch(() => setPosts([]));
  }, []);

  // Admin: Add new post
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('/api/blog', form, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setSuccess(isArabic ? 'تمت إضافة التدوينة' : 'Blog post added!');
      setForm({ title: '', content: '' });
      // Refresh posts
      const res = await axios.get('/api/blog');
      setPosts(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add post');
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" align="center" mb={4}>
        {isArabic ? 'المدونة' : 'Blog'}
      </Typography>

      {user && user.role === 'admin' && (
        <Box mb={4}>
          <Typography variant="h6">{isArabic ? 'إضافة تدوينة جديدة' : 'Add New Blog Post'}</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label={isArabic ? 'العنوان' : 'Title'}
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label={isArabic ? 'المحتوى' : 'Content'}
              name="content"
              value={form.content}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              minRows={3}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              {isArabic ? 'إضافة' : 'Add'}
            </Button>
          </form>
        </Box>
      )}

      <Box>
        {posts.length === 0 && (
          <Typography align="center">{isArabic ? 'لا توجد تدوينات بعد.' : 'No blog posts yet.'}</Typography>
        )}
        {posts.map(post => (
          <Card key={post._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {post.content}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {isArabic ? 'بواسطة' : 'By'} {post.author?.name || 'Admin'}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Blog;