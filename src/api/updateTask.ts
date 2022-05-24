import { API_URL } from '../data/constants';
import { TaskResponse } from '../data/interfacesV';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import decodeToken from './decodeToken';

/* {
  "title": "Task: pet the cat",
  "order": 1,
  "description": "Domestic cat needs to be stroked gently",
  "userId": "40af606c-c0bb-47d1-bc20-a2857242cde3",
  "boardId": "8d3bad56-ad8a-495d-9500-18ae4d1de8dc",
  "columnId": "41344d09-b995-451f-93dc-2f17ae13a4a9"
} */

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

  console.log(updTask);

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
    toastErrorDark('Board not found');
  }

  if (res.status >= 500) {
    toastWarnDark('Server Error');
  }

  return false;
}
