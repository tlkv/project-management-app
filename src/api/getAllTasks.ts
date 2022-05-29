import { API_URL } from '../data/constants';
import { SearchTaskResponse } from '../data/interfaces';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import validateUser from './_validateUser';

const getAllTasks = async (
  logoutUser: () => void,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const userData = await validateUser(logoutUser, setSpinner);
  const defData: SearchTaskResponse[] = [];

  if (userData) {
    setSpinner(true);

    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };

    let res = {} as Response;
    let tasks: SearchTaskResponse[] = [];

    try {
      res = await fetch(`${API_URL}/search/tasks`, options);
      tasks = await res.json();
    } catch (err) {
      toastErrorDark('No response from server');
      setSpinner(false);
      return defData;
    }

    setSpinner(false);

    if (res.ok) {
      return tasks;
    }

    if (res.status === 401) {
      toastErrorDark('Invalid token. Please, log in again');
      logoutUser();
    } else if (res.status >= 400 && res.status <= 499) {
      toastErrorDark('Tasks not found or query error');
    } else if (res.status >= 500) {
      toastWarnDark('Server Error');
    }
  }

  return defData;
};

export default getAllTasks;
