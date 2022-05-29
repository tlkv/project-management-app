import { API_URL } from '../data/constants';
import { TaskResponse } from '../data/interfacesV';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import validateUser from './_validateUser';

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
  logoutUser: () => void,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>
) {
  const userData = await validateUser(logoutUser, setSpinner);

  if (userData) {
    setSpinner(true);

    const url = `${API_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;

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
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updTask),
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
      const task: TaskResponse = await res.json();
      return task;
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
