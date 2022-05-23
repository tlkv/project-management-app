import { API_URL } from '../data/constants';
import { ColumnsResponse } from '../data/interfacesV';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import decodeToken from './decodeToken';
import getColumnSingle from './getColumnSingle';

export default async function updateColumn(
  boardId: string,
  colId: string,
  order: number,
  logoutUser: () => void,
  title?: string
) {
  const url = `${API_URL}/boards/${boardId}/columns/${colId}`;
  const { token } = decodeToken();
  if (!token) {
    toastErrorDark('Invalid token');
    logoutUser();
    return false;
  }

  let newTitle = ' ';
  if (title) {
    newTitle = title;
  } else if (!title) {
    const res = await getColumnSingle(boardId, colId);
    if (res) {
      newTitle = res.title;
    }
  }

  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
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
    return false;
  }

  if (res.ok) {
    const column: ColumnsResponse = await res.json();
    return column;
  }

  if (res.status >= 400 && res.status <= 499) {
    toastErrorDark('Board not found');
  }

  if (res.status >= 500) {
    toastWarnDark('Server Error');
  }

  return false;
}
