import router from '../router/index';
export async function handleRequest(response) {
  console.log('1Handlerequest', response);

  if (!response.ok) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      // logout();
      // location.reload(true);
      localStorage.removeItem('user_token');
      router.push('/login');
    }
    // location.reload(true);
    const error = response.statusText;
    return Promise.reject(error);
  }
  const data = await response.json();
  if (data.success === false) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  console.log('2Handlerequest', data);

  return data;
}
