import { authHeader } from '../helpers';

import { handleRequest } from '../helpers/index';

export const authServices = { register, login, logout, changePassword, deleteAccount };

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(user),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/auth/register`, requestOptions)
    .then(handleRequest)
    .catch((error) => {
      throw error;
    });
}

function login(credentials) {
  const requestOptions = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(credentials),
  };

  return fetch(`${process.env.VUE_APP_API_URI}api/v1/auth/login`, requestOptions)
    .then(handleRequest)
    .then((response) => {
      if (response.success) {
        localStorage.setItem('user_token', response.token);
      }
      return;
    })
    .catch((error) => {
      throw error;
    });
}

function logout() {
  // remove user from local storage to log user out
  // remove user from backend
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
  };

  return fetch(`${process.env.VUE_APP_API_URI}api/v1/auth/logout`, requestOptions)
    .then(handleRequest)
    .then((response) => {
      if (response.success) {
        localStorage.removeItem('user_token');
      } else return response;
      return response;
    })
    .catch((error) => console.error(error));
}

function changePassword(user) {
  console.log('user', user);

  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'content-type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`${process.env.VUE_APP_API_URI}api/v1/auth/change-password`, requestOptions)
    .then(handleRequest)
    .then((response) => {
      if (response.success) return response;
    })
    .catch((error) => console.error(error));
}

function deleteAccount() {
  // remove user from local storage to log user out
  // remove user from backend
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };

  return fetch(`${process.env.VUE_APP_API_URI}api/v1/auth/delete`, requestOptions)
    .then(handleRequest)
    .then((response) => {
      if (response.success) {
        localStorage.removeItem('user_token');
      } else return response;
      return response;
    })
    .catch((error) => console.error(error));
}
