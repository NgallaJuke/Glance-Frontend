import { authHeader } from '../helpers';

import { handleRequest } from '../helpers/index';
export const postServices = { createPost, getUserTimeline };

function createPost(post) {
  const formData = new FormData();

  formData.append('description', post.description);
  post.pictures.forEach((pic) => {
    formData.append('picture', pic);
  });
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: formData,
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/posts/create`, requestOptions)
    .then(handleRequest)
    .catch((error) => {
      throw error;
    });
}

async function getUserTimeline() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  const response = await fetch(`${process.env.VUE_APP_API_URI}api/v1/posts/timeline`, requestOptions);
  if (!response || !response.ok) return;
  const data = await handleRequest(response);
  return data.userTimeline;
}
