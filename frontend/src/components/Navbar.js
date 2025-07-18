import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const isArabic = i18n.language === 'ar';
  const navigate = useNavigate();

  const handleLanguageToggle = () => {
    i18n.changeLanguage(isArabic ? 'en' : 'ar');
    document.body.dir = isArabic ? 'ltr' : 'rtl';
  };

  React.useEffect(() => {
    document.body.dir = isArabic ? 'rtl' : 'ltr';
  }, [isArabic]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ flexDirection: isArabic ? 'row-reverse' : 'row' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Nafsyetak
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">{t('navbar.home')}</Button>
          <Button color="inherit" component={Link} to="/services">{t('navbar.services')}</Button>
          {user && <Button color="inherit" component={Link} to="/booking">{t('navbar.booking')}</Button>}
          <Button color="inherit" component={Link} to="/blog">{t('navbar.blog')}</Button>
          <Button color="inherit" component={Link} to="/doctor">{t('navbar.doctor')}</Button>
          <Button color="inherit" component={Link} to="/faqs">{t('navbar.faqs')}</Button>
          <Button color="inherit" component={Link} to="/contact">{t('navbar.contact')}</Button>
          {user ? (
            <>
              {user.role === 'admin' && (
                <Button color="inherit" component={Link} to="/admin">Admin</Button>
              )}
              <Button color="inherit" onClick={handleLogout}>{t('navbar.logout')}</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">{t('navbar.login')}</Button>
              <Button color="inherit" component={Link} to="/signup">{t('navbar.signup')}</Button>
            </>
          )}
          <IconButton color="inherit" onClick={handleLanguageToggle}>
            {t('navbar.language')}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;