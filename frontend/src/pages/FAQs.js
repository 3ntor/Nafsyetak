import React, { useEffect, useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, CircularProgress, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const FAQs = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/faq?lang=${isArabic ? 'ar' : 'en'}`)
      .then(res => {
        setFaqs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(isArabic ? 'حدث خطأ أثناء جلب الأسئلة' : 'Failed to fetch FAQs');
        setLoading(false);
      });
  }, [isArabic]);

  return (
    <Box maxWidth={700} mx="auto" mt={5} p={3}>
      <Typography variant="h4" align="center" mb={4}>
        {isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {faqs.map((faq, idx) => (
        <Accordion key={idx}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      {!loading && faqs.length === 0 && (
        <Typography align="center" color="text.secondary" mt={2}>
          {isArabic ? 'لا توجد أسئلة شائعة حالياً.' : 'No FAQs available.'}
        </Typography>
      )}
    </Box>
  );
};

export default FAQs;