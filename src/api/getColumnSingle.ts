import { API_URL } from '../data/constants';
import { ColumnsResponse } from '../data/interfacesV';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import decodeToken from './decodeToken';

export default async function getColumnSingle(
  boardId: string,
  columnId: string,
  logoutUser: () => void
) {
  const url = `${API_URL}/boards/${boardId}/columns/${columnId}`;
  const { token } = decodeToken();

  if (!token) {
    toastErrorDark('Invalid token');
    logoutUser();
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
    const column: ColumnsResponse = await res.json();
    return column;
  }

  if (res.status >= 400 && res.status <= 499) {
    toastErrorDark('Bad query or conflict with another user session');
  }

  if (res.status >= 500) {
    toastWarnDark('Server Error');
  }

  return false;
}
