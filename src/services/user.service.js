import { authHeader } from '../helpers/index';
import { handleRequest } from '../helpers/index';
// import router from '../router/index';

export const userServices = {
  getCurrentUser,
  getSingleUser,
  updateAvatar,
};

async function getCurrentUser() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/auth/current-user`, requestOptions)
    .then(handleRequest)
    .then((response) => {
      return response.UserProfil;
    })
    .catch((error) => {
      throw error;
    });
}
async function getSingleUser(userName) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/users/${userName}`, requestOptions)
    .then(handleRequest)
    .then((response) => {
      return response.UserProfil;
    })
    .catch((error) => {
      throw error;
    });
}
async function updateAvatar(avatar) {
  console.log('AVATAR', avatar);

  const formData = new FormData();

  avatar.forEach((pic) => {
    formData.append('file', pic);
  });
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
}
