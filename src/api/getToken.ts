import { API_URL } from '../data/constants';
import { toastErrorDark } from '../utils/toast';

export default async function getToken(login: string, password: string): Promise<string | false> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login,
      password,
    }),
  };
  let res = {} as Response;
  try {
    res = await fetch(`${API_URL}/signin`, options);
  } catch (err) {
    toastErrorDark('No response from server');
    return false;
  }

  if (res.ok) {
    const body = await res.json();
    return body.token;
  }

  if (res.status >= 400 && res.status <= 499) {
    toastErrorDark('Wrong login or password');
  }
  if (res.status >= 500) {
    toastErrorDark('Server error');
  }

  return false;
}
