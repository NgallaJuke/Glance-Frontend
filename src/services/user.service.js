import { authHeader } from '../helpers/index';
import { handleRequest } from '../helpers/index';
// import router from '../router/index';

export const userServices = {
  getCurrentUser,
};

function getCurrentUser() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/auth/current-user`, requestOptions)
    .then(handleRequest)
    .then((response) => {
      return response.UserProfil;
    })
    .catch((error) => console.error(error));
}
