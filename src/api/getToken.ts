import { API_URL } from '../data/constants';
import { toastErrorDark, toastWarnDark } from '../utils/toast';

export default async function getToken(
  login: string,
  password: string,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>
): Promise<string | false> {
  setSpinner(true);

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
    toastWarnDark('No response from server');
    setSpinner(false);
    return false;
  }

  setSpinner(false);

  if (res.ok) {
    const body = await res.json();
    return body.token;
  }

  if (res.status >= 400 && res.status <= 499) {
    toastErrorDark('Wrong login or password');
  }
  if (res.status >= 500) {
    toastWarnDark('Server error');
  }

  return false;
}
