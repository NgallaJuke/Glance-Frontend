import { authHeader } from '../helpers';
import { handleRequest, handleRequestPostFeed } from '../helpers/index';
export const postServices = { createPost, likePost, disLikePost, getPostFeed };

async function createPost(post) {
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

async function likePost(postID) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/posts/${postID}/like`, requestOptions)
    .then(handleRequest)
    .catch((error) => {
      throw error;
    });
}

async function disLikePost(postID) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/posts/${postID}/unlike`, requestOptions)
    .then(handleRequest)
    .catch((error) => {
      throw error;
    });
}

async function getPostFeed(timeline, userName) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  if (timeline === 'timeline') {
    return fetch(`${process.env.VUE_APP_API_URI}api/v1/posts/${timeline}`, requestOptions)
      .then(handleRequestPostFeed)
      .catch((error) => {
        throw error;
      });
  } else {
    return fetch(`${process.env.VUE_APP_API_URI}api/v1/posts/${userName}/${timeline}`, requestOptions)
      .then(handleRequestPostFeed)
      .catch((error) => {
        throw error;
      });
  }
}
