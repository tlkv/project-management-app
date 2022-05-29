import { API_URL } from '../data/constants';
import { ColumnsResponse } from '../data/interfaces';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import getColumnSingle from './getColumnSingle';
import validateUser from './_validateUser';

export default async function updateColumn(
  boardId: string,
  colId: string,
  order: number,
  logoutUser: () => void,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>,
  title?: string
) {
  const userData = await validateUser(logoutUser, setSpinner);

  if (userData) {
    setSpinner(true);

    const url = `${API_URL}/boards/${boardId}/columns/${colId}`;

    let newTitle = ' ';
    if (title) {
      newTitle = title;
    } else if (!title) {
      const res = await getColumnSingle(boardId, colId, logoutUser);
      if (res) {
        newTitle = res.title || ' ';
      }
    }

    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTitle,
        order,
      }),
    };

    let res = {} as Response;

    try {
      res = await fetch(url, options);
    } catch {
      toastErrorDark('No response from server');
      setSpinner(false);
      return false;
    }

    setSpinner(false);

    if (res.ok) {
      const column: ColumnsResponse = await res.json();
      return column;
    }

    if (res.status === 401) {
      toastErrorDark('Invalid token. Please, log in again');
      logoutUser();
    } else if (res.status >= 400 && res.status <= 499) {
      toastErrorDark('Bad query or conflict with another user session');
    } else if (res.status >= 500) {
      toastWarnDark('Server Error');
    }
  }

  return false;
}
