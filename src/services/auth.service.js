// import { authHeader } from '../helpers';
const API_URI = 'http://localhost:5000/api/v1';

export const authServices = { register };

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

async function handleRequest(response) {
  console.log('RESPONSE', response);

  const data = await response.json();
  if (!data.success === 'false') {
    console.log('REQUEST FAILED');

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  console.log('DATA', data);

  return data;
}
