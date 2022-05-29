import { API_URL } from '../data/constants';
import { toastErrorDark } from '../utils/toast';

export default async function getResponseOnCreatingUser(
  name: string,
  login: string,
  password: string,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>
): Promise<Response> {
  setSpinner(true);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      login,
      password,
    }),
  };

  let res = {} as Response;

  try {
    res = await fetch(`${API_URL}/signup`, options);
  } catch {
    toastErrorDark('No response from server');
    setSpinner(false);
    return res;
  }

  setSpinner(false);

  if (res.status >= 400 && res.status <= 499) {
    toastErrorDark('Login already exists or client error');
  }

  if (res.status >= 500) {
    toastErrorDark('Server error');
  }

  return res;
}
