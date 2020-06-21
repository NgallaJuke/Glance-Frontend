export function authHeader() {
  // return authorization header with jwt token
  let token = localStorage.getItem('user_token');

  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}
