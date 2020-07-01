import { authHeader } from '../helpers/index';
import { handleRequest } from '../helpers/index';
// import router from '../router/index';

export const userServices = {
  getCurrentUser,
};

async function getCurrentUser() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  const response = await fetch(`${process.env.VUE_APP_API_URI}api/v1/auth/current-user`, requestOptions);
  const data = await handleRequest(response);
  return data.UserProfil;
}
