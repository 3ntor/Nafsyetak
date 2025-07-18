import React from 'react';
import { Box, Typography, Link as MuiLink, Grid, IconButton } from '@mui/material';
import { Facebook, Instagram, LinkedIn } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const clinicInfo = {
  address_en: "123 Clinic Street, Cairo, Egypt",
  address_ar: "١٢٣ شارع العيادة، القاهرة، مصر",
  phone1: "+20 100 123 4567",
  phone2: "+20 100 987 6543",
  email: "info@nafsyetak.com",
  name_en: "Nafsyetak",
  name_ar: "نفسيتك",
};

const Footer = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#222",
        color: "#fff",
        mt: 6,
        py: 4,
        px: { xs: 2, md: 8 },
        direction: isArabic ? 'rtl' : 'ltr'
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Clinic Name & Logo */}
        <Grid item xs={12} md={3}>
          <Typography variant="h5" fontWeight="bold" mb={1}>
            {isArabic ? clinicInfo.name_ar : clinicInfo.name_en}
          </Typography>
          {/* يمكنك وضع شعار هنا إذا توفر لديك */}
          {/* <img src="/logo.png" alt="Nafsyetak Logo" style={{ maxWidth: 120 }} /> */}
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" mb={1}>
            {isArabic ? 'روابط سريعة' : 'Quick Links'}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <MuiLink component={Link} to="/" color="inherit" underline="hover">{isArabic ? 'الرئيسية' : 'Home'}</MuiLink>
            <MuiLink component={Link} to="/services" color="inherit" underline="hover">{isArabic ? 'الخدمات' : 'Services'}</MuiLink>
            <MuiLink component={Link} to="/blog" color="inherit" underline="hover">{isArabic ? 'المدونة' : 'Blog'}</MuiLink>
            <MuiLink component={Link} to="/booking" color="inherit" underline="hover">{isArabic ? 'الحجز' : 'Booking'}</MuiLink>
            <MuiLink component={Link} to="/faqs" color="inherit" underline="hover">{isArabic ? 'الأسئلة الشائعة' : 'FAQs'}</MuiLink>
            <MuiLink component={Link} to="/contact" color="inherit" underline="hover">{isArabic ? 'اتصل بنا' : 'Contact Us'}</MuiLink>
          </Box>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" mb={1}>
            {isArabic ? 'معلومات التواصل' : 'Contact Info'}
          </Typography>
          <Typography>{isArabic ? clinicInfo.address_ar : clinicInfo.address_en}</Typography>
          <Typography>{isArabic ? 'هاتف:' : 'Phone:'} {clinicInfo.phone1}</Typography>
          <Typography>{isArabic ? 'هاتف:' : 'Phone:'} {clinicInfo.phone2}</Typography>
          <Typography>{isArabic ? 'البريد الإلكتروني:' : 'Email:'} {clinicInfo.email}</Typography>
          <Box mt={1}>
            <IconButton color="inherit" href="https://facebook.com" target="_blank"><Facebook /></IconButton>
            <IconButton color="inherit" href="https://instagram.com" target="_blank"><Instagram /></IconButton>
            <IconButton color="inherit" href="https://linkedin.com" target="_blank"><LinkedIn /></IconButton>
          </Box>
        </Grid>
      </Grid>
      <Box mt={4} textAlign="center" fontSize={14} color="#bbb">
        {isArabic
          ? "© 2025 نفسيتك. جميع الحقوق محفوظة."
          : "© 2025 Nafsyetak. All rights reserved."
        }
      </Box>
    </Box>
  );
};

export default Footer;