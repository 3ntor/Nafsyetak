import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navbar: {
        home: 'Home',
        services: 'Services',
        booking: 'Booking',
        blog: 'Blog',
        doctor: 'Doctor',
        faqs: 'FAQs',
        contact: 'Contact Us',
        login: 'Login',
        signup: 'Sign Up',
        logout: 'Logout',
        language: 'العربية',
      },
    },
  },
  ar: {
    translation: {
      navbar: {
        home: 'الرئيسية',
        services: 'الخدمات',
        booking: 'الحجز',
        blog: 'المدونة',
        doctor: 'الطبيب',
        faqs: 'الأسئلة الشائعة',
        contact: 'اتصل بنا',
        login: 'تسجيل الدخول',
        signup: 'إنشاء حساب',
        logout: 'تسجيل الخروج',
        language: 'English',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;