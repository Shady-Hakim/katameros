import axios from 'axios';
import {BASE_URL, POSTS_ENDPOINT} from '../constants';

const fetchSinglePost = id => {
  return axios
    .get(BASE_URL + POSTS_ENDPOINT, {
      params: {include: id},
    })
    .then(res =>
      res.data.map(post => ({
        title: post.title.rendered,
        id: post.id,
        categories: post.categories,
        content: post.content.rendered,
      })),
    );
};

export default fetchSinglePost;
