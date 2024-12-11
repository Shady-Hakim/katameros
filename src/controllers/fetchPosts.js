import axios from 'axios';
import { BASE_URL, POSTS_ENDPOINT } from '../constants';

const fetchPosts = async (id, page) => {
  const response = await axios.get(BASE_URL + POSTS_ENDPOINT, {
    params: { categories: id, per_page: 10, page, order: 'asc' },
  });

  const totalPages = parseInt(response.headers['x-wp-totalpages'], 10) || 1;

  return {
    posts: response.data.map((post) => ({
      id: post.id,
      title: post.title.rendered,
      categories: post.categories,
    })),
    hasNextPage: page < totalPages,
  };
};

export default fetchPosts;
