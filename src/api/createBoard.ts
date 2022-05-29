import { API_URL } from '../data/constants';
import { BoardsResponse } from '../data/interfaces';
import { toastErrorDark, toastSuccessDark, toastWarnDark } from '../utils/toast';

export default async function createBoard(
  title: string,
  description: string,
  logoutUser: () => void
) {
  const url = `${API_URL}/boards`;
  const token = localStorage.getItem('pmapp34-token') || '';
  if (!token) {
    toastErrorDark('Invalid token. Please, sign in again');
    logoutUser();
    return false;
  }

  let res = {} as Response;

  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  } catch {
    toastErrorDark('No response from server');
    return false;
  }

  if (res.ok) {
    const board: BoardsResponse = await res.json();
    toastSuccessDark('Board successfully created');
    return board;
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
