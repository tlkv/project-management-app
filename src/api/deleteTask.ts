import { API_URL } from '../data/constants';
import { toastErrorDark, toastSuccessDark, toastWarnDark } from '../utils/toast';
import validateUser from './_validateUser';

export default async function deleteTask(
  boardId: string,
  colId: string,
  taskId: string,
  logoutUser: () => void,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>
) {
  const userData = await validateUser(logoutUser, setSpinner);

  if (userData) {
    setSpinner(true);

    const url = `${API_URL}/boards/${boardId}/columns/${colId}/tasks/${taskId}`;

    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
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
      toastSuccessDark('Task was successfully removed');
      return res;
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
