import axios from 'axios';

const BASE_URL = 'https://api.katameros.app';
const LANGUAGE_ID = 3; // Arabic

const getCurrentDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}-${month}-${year}`;
};

export const fetchTodayReadings = async () => {
  const date = getCurrentDate();
  const url = `${BASE_URL}/readings/gregorian/${date}`;

  const response = await axios.get(url, {
    params: {
      languageId: LANGUAGE_ID,
    },
    timeout: 10000,
  });

  console.log('Readings fetched successfully');
  return response.data;
};
