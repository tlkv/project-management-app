import { API_URL } from '../data/constants';
import { toastErrorDark, toastSuccessDark, toastWarnDark } from '../utils/toast';

export default async function deleteTask(
  boardId: string,
  colId: string,
  taskId: string,
  logoutUser: () => void
) {
  const url = `${API_URL}/boards/${boardId}/columns/${colId}/tasks/${taskId}`;
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
    toastSuccessDark('Task was successfully removed');
    return res;
  }

  if (res.status >= 400 && res.status <= 499) {
    toastErrorDark('Task not found');
  }

  if (res.status >= 500) {
    toastWarnDark('Server Error');
  }

  return false;
}
