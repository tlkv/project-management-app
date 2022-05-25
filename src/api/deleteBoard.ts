import { API_URL } from '../data/constants';
import { toastErrorDark, toastSuccessDark, toastWarnDark } from '../utils/toast';

export default async function deleteBoard(id: string, logoutUser: () => void) {
  const url = `${API_URL}/boards/${id}`;
  const token = localStorage.getItem('pmapp34-token') || '';
  if (!token) {
    toastErrorDark('Invalid token');
    logoutUser();
    return false;
  }

  let res = {} as Response;

  try {
    res = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    toastErrorDark('No response from server');
    return false;
  }

  if (res.ok) {
    toastSuccessDark('Board was successfully removed');
    return res;
  }

  if (res.status === 401) {
    toastErrorDark('Not authorized or credentials expired. Please, log in again');
    logoutUser();
  } else if (res.status >= 400 && res.status <= 499) {
    toastErrorDark('Bad query or conflict with another user session');
  } else if (res.status >= 500) {
    toastWarnDark('Server Error');
  }

  return false;
}
