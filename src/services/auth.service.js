// import { authHeader } from '../helpers';

import { handleRequest } from '../helpers/index';
const API_URI = 'http://localhost:5000/api/v1';

export const authServices = { register, login };

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
  console.log('Credentials', credentials);

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
