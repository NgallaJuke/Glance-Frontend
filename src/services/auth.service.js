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

async function login(credentials) {
  const requestOptions = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(credentials),
  };
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${process.env.VUE_APP_API_URI}api/v1/auth/login`, requestOptions);
    console.log('response', response);

    const data = await handleRequest(response);
    console.log(`data`, data);

    if (data.success) {
      localStorage.setItem('user_token', data.token);
    }
  } catch (error) {
    throw error;
  }
}

async function logout() {
  // remove user from local storage to log user out
  // remove user from backend
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
  };

  try {
    const response = await fetch(`${process.env.VUE_APP_API_URI}api/v1/auth/logout`, requestOptions);
    const data = await handleRequest(response);
    if (data.type === 'success') {
      localStorage.removeItem('user_token');
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
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
