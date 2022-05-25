import { API_URL } from '../data/constants';
import { TaskResponse } from '../data/interfacesV';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import decodeToken from './decodeToken';

const getAllTasks = async (logoutUser: () => void) => {
  const { token } = decodeToken();
  const defData: TaskResponse[] = [];

  if (!token) {
    toastErrorDark('Invalid token');
    logoutUser();
    return defData;
  }

  const options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  let res = {} as Response;
  let users: TaskResponse[] = [];

  try {
    res = await fetch(`${API_URL}/search/tasks`, options);
    users = await res.json();
  } catch (err) {
    toastErrorDark('No response from server');
    return defData;
  }

  if (res.ok) {
    return users;
  }

  if (res.status === 401) {
    toastErrorDark('Not authorized or credentials expired. Please, log in again');
    logoutUser();
  } else if (res.status >= 400 && res.status <= 499) {
    toastErrorDark('Tasks not found or query error');
  } else if (res.status >= 500) {
    toastWarnDark('Server Error');
  }

  return defData;
};

export default getAllTasks;
