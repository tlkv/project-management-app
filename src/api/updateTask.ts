import { API_URL } from '../data/constants';
import { TaskResponse } from '../data/interfacesV';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import decodeToken from './decodeToken';

export default async function updateTask(
  boardId: string,
  columnId: string,
  taskId: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  newBoardId: string,
  newColumnId: string,
  logoutUser: () => void
) {
  const url = `${API_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
  const { token } = decodeToken();

  if (!token) {
    toastErrorDark('Invalid token');
    logoutUser();
    return false;
  }

  const updTask = {
    title,
    order,
    description,
    userId,
    boardId: newBoardId,
    columnId: newColumnId,
  };

  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updTask),
  };

  let res = {} as Response;

  try {
    res = await fetch(url, options);
  } catch {
    toastErrorDark('No response from server');
    return false;
  }

  if (res.ok) {
    const task: TaskResponse = await res.json();
    return task;
  }

  if (res.status >= 400 && res.status <= 499) {
    toastErrorDark('Bad query or conflict with another user session');
  }

  if (res.status >= 500) {
    toastWarnDark('Server Error');
  }

  return false;
}
