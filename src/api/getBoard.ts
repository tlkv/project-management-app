import { API_URL } from '../data/constants';
import { BoardResponse } from '../data/interfacesV';
import { toastErrorDark, toastWarnDark } from '../utils/toast';

export default async function getBoard(id: string) {
  const url = `${API_URL}/boards/${id}`;
  const token = localStorage.getItem('pmapp34-token') || '';

  if (!token) {
    toastErrorDark('Invalid token');
    return false;
  }

  let res = {} as Response;

  try {
    res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  } catch {
    toastErrorDark('No response from server');
    return false;
  }

  if (res.ok) {
    const board: BoardResponse = await res.json();
    return board;
  }

  if (res.status >= 400 && res.status <= 499) {
    toastErrorDark('Boards not found');
  }

  if (res.status >= 500) {
    toastWarnDark('Server Error');
  }
  return false;
}
