import { authHeader } from '../helpers';

import { handleRequest } from '../helpers/index';
export const commentServices = { makeComment };

async function makeComment(post) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'content-type': 'application/json' },
    body: JSON.stringify(post),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/comments/${post.postID}/comment`, requestOptions)
    .then(handleRequest)
    .catch((error) => {
      throw error;
    });
}
