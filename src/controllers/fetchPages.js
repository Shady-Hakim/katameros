import axios from 'axios';
import {BASE_URL, PAGES_ENDPOINT} from '../constants';

const fetchPages = id => {
  return axios
    .get(BASE_URL + PAGES_ENDPOINT, {
      params: {include: id},
    })
    .then(res =>
      res.data.map(page => ({
        title: page.title.rendered,
        id: page.id,
        content: page.content.rendered,
      })),
    );
};

export default fetchPages;
