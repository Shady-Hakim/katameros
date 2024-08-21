import axios from 'axios';
import { BASE_URL, CATEGORIES_ENDPOINT } from '../constants';

const fetchCategories = (id, page) => {
  return axios
    .get(BASE_URL + CATEGORIES_ENDPOINT, {
      params: { per_page: 10, page: page, parent: id, orderby: 'id' },
    })
    .then((res) => res.data);
};

export default fetchCategories;
