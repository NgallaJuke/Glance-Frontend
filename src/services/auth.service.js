import { authHeader } from '../helpers';

import { handleRequest } from '../helpers/index';
const API_URI = 'http://localhost:5000/api/v1';

export const authServices = { register, login, logout };

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(user),
  };
  return fetch(`${API_URI}/auth/register`, requestOptions)
    .then(handleRequest)
    .catch((error) => console.error(error));
}
function login(credentials) {
  const requestOptions = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(credentials),
  };

  return fetch(`${API_URI}/auth/login`, requestOptions)
    .then(handleRequest)
    .then((response) => {
      if (response.success) {
        localStorage.setItem('user_token', response.token);
      } else return response;
      return response.user;
    })
    .catch((error) => console.error(error));
}

function logout() {
  // remove user from local storage to log user out
  // remove user from backend
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
  };

  return fetch(`${API_URI}/auth/logout`, requestOptions)
    .then(handleRequest)
    .then((response) => {
      if (response.success) {
        localStorage.removeItem('user_token');
      } else return response;
      return response;
    })
    .catch((error) => console.error(error));
}
