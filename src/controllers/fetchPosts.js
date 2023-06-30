import axios from 'axios';
import { BASE_URL, POSTS_ENDPOINT } from '../constants';

const fetchPosts = (id) => {
  return axios
    .get(BASE_URL + POSTS_ENDPOINT, {
      params: { categories: id, per_page: 100, order: 'asc' },
    })
    .then((res) =>
      res.data.map((post) => ({
        title: post.title.rendered,
        id: post.id,
        categories: post.categories,
      }))
    );
};

export default fetchPosts;
