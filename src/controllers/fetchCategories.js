import axios from 'axios';
import {BASE_URL, CATEGORIES_ENDPOINT} from '../constants';

const fetchCategories = id => {
  return axios
    .get(BASE_URL + CATEGORIES_ENDPOINT, {
      params: {per_page: 100, parent: id, orderby: 'id'},
    })
    .then(res => res.data);
};

export default fetchCategories;
