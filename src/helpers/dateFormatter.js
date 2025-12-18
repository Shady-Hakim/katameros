/**
 * Get Arabic day name
 */
const getArabicDayName = (dayIndex) => {
  const days = [
    'الأحد',
    'الإثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ];
  return days[dayIndex];
};

/**
 * Get Arabic month name
 */
const getArabicMonthName = (monthIndex) => {
  const months = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ];
  return months[monthIndex];
};

/**
 * Get Coptic month name in Arabic
 */
const getCopticMonthName = (monthIndex) => {
  const months = [
    'توت',
    'بابه',
    'هاتور',
    'كيهك',
    'طوبه',
    'أمشير',
    'برمهات',
    'برموده',
    'بشنس',
    'بؤونه',
    'أبيب',
    'مسرى',
    'النسيء',
  ];
  return months[monthIndex - 1] || '';
};

/**
 * Get Arabic ordinal number
 */
const getArabicOrdinal = (day) => {
  const ordinals = [
    '',
    'الأول',
    'الثاني',
    'الثالث',
    'الرابع',
    'الخامس',
    'السادس',
    'السابع',
    'الثامن',
    'التاسع',
    'العاشر',
    'الحادي عشر',
    'الثاني عشر',
    'الثالث عشر',
    'الرابع عشر',
    'الخامس عشر',
    'السادس عشر',
    'السابع عشر',
    'الثامن عشر',
    'التاسع عشر',
    'العشرون',
    'الحادي والعشرون',
    'الثاني والعشرون',
    'الثالث والعشرون',
    'الرابع والعشرون',
    'الخامس والعشرون',
    'السادس والعشرون',
    'السابع والعشرون',
    'الثامن والعشرون',
    'التاسع والعشرون',
    'الثلاثون',
  ];
  return ordinals[day] || `اليوم ${day}`;
};

/**
 * Format Coptic date like "اليوم التاسع من شهر كيهك"
 * @param {string} copticDate - Format: "day/month/year" e.g., "3/4/1742"
 */
export const formatCopticDate = (copticDate) => {
  if (!copticDate) return '';

  const parts = copticDate.split('/');
  if (parts.length !== 3) return '';

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);

  const dayName = getArabicOrdinal(day);
  const monthName = getCopticMonthName(month);

  return `اليوم ${dayName} من شهر ${monthName}`;
};

/**
 * Format date in Arabic style: "الخميس، 18 ديسمبر 2025"
 */
export const formatArabicDate = (date = new Date()) => {
  const dayName = getArabicDayName(date.getDay());
  const day = date.getDate();
  const monthName = getArabicMonthName(date.getMonth());
  const year = date.getFullYear();

  return `${dayName}، ${day} ${monthName} ${year}`;
};
