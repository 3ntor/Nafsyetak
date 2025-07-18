import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 1,
    image: '/service1.jpg',
    title_en: 'Cognitive Behavioral Therapy',
    title_ar: 'العلاج السلوكي المعرفي',
    desc_en: 'Effective for anxiety, depression, and more.',
    desc_ar: 'فعال للقلق والاكتئاب والمزيد.',
  },
  {
    id: 2,
    image: '/service2.jpg',
    title_en: 'Family Counseling',
    title_ar: 'الإرشاد الأسري',
    desc_en: 'Resolve family conflicts and improve relationships.',
    desc_ar: 'حل النزاعات الأسرية وتحسين العلاقات.',
  },
  {
    id: 3,
    image: '/service3.jpg',
    title_en: 'Child & Adolescent Therapy',
    title_ar: 'علاج الأطفال والمراهقين',
    desc_en: 'Specialized care for young people.',
    desc_ar: 'رعاية متخصصة للصغار.',
  },
  {
    id: 4,
    image: '/service4.jpg',
    title_en: 'Addiction Treatment',
    title_ar: 'علاج الإدمان',
    desc_en: 'Support for overcoming addiction.',
    desc_ar: 'دعم للتغلب على الإدمان.',
  },
  {
    id: 5,
    image: '/service5.jpg',
    title_en: 'Couples Therapy',
    title_ar: 'علاج الأزواج',
    desc_en: 'Strengthen your relationship.',
    desc_ar: 'تعزيز علاقتك الزوجية.',
  },
];

const Home = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const navigate = useNavigate();

  return (
    <Box p={4}>
      <Typography variant="h3" align="center" mb={3}>
        {isArabic ? 'عيادة نفسيتك' : 'Nafsyetak Clinic'}
      </Typography>
      <Typography variant="h6" align="center" mb={5}>
        {isArabic
          ? 'نحن هنا لدعم صحتك النفسية وتقديم أفضل خدمات العلاج النفسي والإرشاد الأسري.'
          : 'We are here to support your mental health and provide the best psychological therapy and family counseling services.'}
      </Typography>
      <Typography variant="h5" mb={3}>
        {isArabic ? 'خدماتنا الرئيسية' : 'Our Key Services'}
      </Typography>
      <Grid container spacing={3}>
        {services.map(service => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card>
              <CardMedia
                component="img"
                height="160"
                image={service.image}
                alt={isArabic ? service.title_ar : service.title_en}
              />
              <CardContent>
                <Typography variant="h6">
                  {isArabic ? service.title_ar : service.title_en}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {isArabic ? service.desc_ar : service.desc_en}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('/services')}
                >
                  {isArabic ? 'تعرف أكثر' : 'Learn More'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;