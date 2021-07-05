import { authHeader } from '../helpers';
import { handleRequest, handleRequestPostFeed } from '../helpers/index';
export const postServices = {
  createPost,
  deletePost,
  likePost,
  disLikePost,
  getLikedPost,
  getHashtagPost,
  getPostFeed,
  getDiscoverPost,
};

async function createPost(post) {
  const formData = new FormData();

  formData.append('description', post.description);
  formData.append('tags', JSON.stringify(post.tags));
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

async function deletePost(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/posts/${id}/delete`, requestOptions)
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

async function getLikedPost(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/posts/like/${id}`, requestOptions)
    .then(handleRequest)
    .catch((error) => {
      throw error;
    });
}

async function getPostFeed(timeline, userName, limit) {
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
  } else if (userName && limit) {
    return fetch(`${process.env.VUE_APP_API_URI}api/v1/posts/${userName}/${timeline}?limit=${limit}`, requestOptions)
      .then(handleRequestPostFeed)
      .catch((error) => {
        throw error;
      });
  } else {
    return fetch(`${process.env.VUE_APP_API_URI}api/v1/posts/${userName}/${timeline}?limit=all`, requestOptions)
      .then(handleRequestPostFeed)
      .catch((error) => {
        throw error;
      });
  }
}

async function getHashtagPost(payload) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(
    `${process.env.VUE_APP_API_URI}api/v1/posts/hashtags/${payload.hashtag}?popular=true&limit=${payload.limit}`,
    requestOptions
  )
    .then(handleRequest)
    .catch((error) => {
      throw error;
    });
}

async function getDiscoverPost(limit) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${process.env.VUE_APP_API_URI}api/v1/posts?limit=${limit}`, requestOptions)
    .then(handleRequestPostFeed)
    .catch((error) => {
      throw error;
    });
}
