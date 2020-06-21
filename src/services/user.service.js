import { authHeader } from '../helpers/index';
import { handleRequest } from '../helpers/index';
// import router from '../router/index';
const API_URI = 'http://localhost:5000/api/v1';

export const userServices = {
  getCurrentUser,
};

function getCurrentUser() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${API_URI}/auth/current-user`, requestOptions)
    .then(handleRequest)
    .then((response) => {
      return response.UserProfil;
    })
    .catch((error) => console.error(error));
}
