import { authHeader } from '../helpers/index';
import { handleRequest } from '../helpers/index';
// import router from '../router/index';

export const userServices = {
  getCurrentUser,
  getSingleUser,
  getAllFollower,
  getAllFollowing,
  updateAvatar,
  updateUser,
  getAllUser,
  followUser,
  unFollowUser,
};

async function getCurrentUser() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/auth/current-user`, requestOptions)
    .then(handleRequest)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}
async function getSingleUser(payload) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  if (payload.userName) {
    return fetch(`${process.env.VUE_APP_API_URI}api/v1/users/${payload.userName}`, requestOptions)
      .then(handleRequest)
      .catch((error) => {
        throw error;
      });
  } else {
    return fetch(`${process.env.VUE_APP_API_URI}api/v1/users/user/${payload.userID}`, requestOptions)
      .then(handleRequest)
      .catch((error) => {
        throw error;
      });
  }
}
async function getAllUser() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/users/`, requestOptions)
    .then(handleRequest)
    .catch((error) => {
      throw error;
    });
}
async function getAllFollower(userid) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/users/all-follower/${userid}`, requestOptions)
    .then(handleRequest)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}
async function getAllFollowing(userid) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/users/all-following/${userid}`, requestOptions)
    .then(handleRequest)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

async function updateAvatar(avatar) {
  if (avatar !== null) {
    const formData = new FormData();
    formData.append('file', avatar);

    const requestOptions = {
      method: 'PUT',
      headers: authHeader(),
      body: formData,
    };

    return fetch(`${process.env.VUE_APP_API_URI}api/v1/users/update-avatar`, requestOptions)
      .then(handleRequest)
      .catch((error) => {
        throw error;
      });
  } else {
    const requestOptions = {
      method: 'PUT',
      headers: authHeader(),
    };

    return fetch(`${process.env.VUE_APP_API_URI}api/v1/users/update-avatar?reset=yes`, requestOptions)
      .then(handleRequest)
      .catch((error) => {
        throw error;
      });
  }
}

async function updateUser(user) {
  Object.keys(user).forEach((k) => user[k] === '' && delete user[k]);
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'content-type': 'application/json' },
    body: JSON.stringify(user),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/users/update`, requestOptions)
    .then(handleRequest)
    .catch((error) => {
      throw error;
    });
}

async function followUser(userID) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/users/${userID}/follow`, requestOptions)
    .then(handleRequest)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

async function unFollowUser(userID) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/users/${userID}/unfollow`, requestOptions)
    .then(handleRequest)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}
