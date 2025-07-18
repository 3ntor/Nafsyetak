import React from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

const doctorInfo = {
  name_en: "Dr. Ahmed Hassan",
  name_ar: "د. أحمد حسن",
  bio_en: "Consultant Psychiatrist with 15+ years of experience in psychological therapy, family counseling, and addiction treatment.",
  bio_ar: "استشاري الطب النفسي بخبرة تزيد عن 15 عامًا في العلاج النفسي والإرشاد الأسري وعلاج الإدمان.",
  certifications_en: [
    "MD, Psychiatry - Cairo University",
    "Diploma in Cognitive Behavioral Therapy (CBT)",
    "Certified Family Counselor",
    "Member of the Egyptian Psychiatric Association"
  ],
  certifications_ar: [
    "دكتوراه في الطب النفسي - جامعة القاهرة",
    "دبلومة العلاج السلوكي المعرفي",
    "استشاري إرشاد أسري معتمد",
    "عضو الجمعية المصرية للطب النفسي"
  ]
};

const Doctor = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <Box maxWidth={600} mx="auto" mt={5} p={3}>
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" mb={2}>
            {isArabic ? doctorInfo.name_ar : doctorInfo.name_en}
          </Typography>
          <Typography variant="body1" align="center" mb={3}>
            {isArabic ? doctorInfo.bio_ar : doctorInfo.bio_en}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" mb={1}>
            {isArabic ? "الشهادات والدبلومات" : "Certifications & Diplomas"}
          </Typography>
          <List>
            {(isArabic ? doctorInfo.certifications_ar : doctorInfo.certifications_en).map((item, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Doctor;