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
    if (response.status === 404 || response.status === 500) {
      throw response.statusText;
    }

    // location.reload(true);
  }
  const data = await response.json();
  console.log('DATA', data);

  if (!data.success) {
    throw data.error;
  } else {
    return data;
  }
}
