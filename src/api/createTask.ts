import { API_URL } from '../data/constants';
import { TaskResponse } from '../data/interfacesV';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import decodeToken from './decodeToken';

export default async function createTask(
  boardId: string,
  columnId: string,
  title: string,
  done: boolean,
  order: number,
  description: string
) {
  const url = `${API_URL}/boards/${boardId}/columns/${columnId}/tasks`;
  const token = localStorage.getItem('pmapp34-token') || '';
  const { id } = decodeToken();
  if (!token) {
    toastErrorDark('Invalid token');
    return false;
  }

  const newTask = {
    title,
    done,
    order,
    description,
    userId: id,
  };

  let res = {} as Response;

  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });
  } catch {
    toastErrorDark('No response from server');
    return false;
  }

  if (res.ok) {
    const task: TaskResponse = await res.json();
    return task;
  }

  if (res.status >= 400 && res.status <= 499) {
    toastErrorDark('Board not found');
  }

  if (res.status >= 500) {
    toastWarnDark('Server Error');
  }

  return false;
}
