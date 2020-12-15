import router from '../router/index';
export async function handleRequest(response) {
  if (!response.ok) {
    //if user try to access to a forbiden toute then log him out
    if (response.status === 401) {
      localStorage.removeItem('user_token');
      router.push('/login');
    }
    if (response.status === 404 || response.status === 500) {
      const data = await response.json();
      if (data.error) throw data.error;
      throw response.statusText;
    }

    // location.reload(true);
  }
  const data = await response.json();

  if (!data.success) {
    throw data.error;
  } else {
    return data;
  }
}
export async function handleRequestPostFeed(response) {
  if (!response.ok) {
    //if user try to access to a forbiden toute then log him out
    if (response.status === 401) {
      localStorage.removeItem('user_token');
      router.push('/login');
    }
    if (response.status === 404 || response.status === 500) {
      const data = await response.json();
      if (data.error) throw data.error;
      throw response.statusText;
    }

    // location.reload(true);
  }
  const data = await response.json();
  if (!data) throw 'UserFeed is Empty';

  return data;
}
