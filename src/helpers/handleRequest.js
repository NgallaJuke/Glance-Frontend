import router from '../router/index';
export async function handleRequest(response) {
  if (!response.ok) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      // logout();
      // location.reload(true);
      localStorage.removeItem('user_token');
      router.push('/login');
    }
    // location.reload(true);
  }
  const data = await response.json();
  if (data.success === false) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  console.log('Handlerequest', data);

  return data;
}
