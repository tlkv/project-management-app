import { API_URL } from '../data/constants';
import { ApiUserInfo } from '../data/interfaces';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import validateUser from './_validateUser';

const getAllUsers = async (
  logoutUser: () => void,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const userData = await validateUser(logoutUser, setSpinner);
  const defData: ApiUserInfo[] = [];

  if (userData) {
    setSpinner(true);

    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };

    let res = {} as Response;
    let users: ApiUserInfo[] = [];

    try {
      res = await fetch(`${API_URL}/users`, options);
      users = await res.json();
    } catch (err) {
      toastWarnDark('No response from server');
      setSpinner(false);
      return defData;
    }

    setSpinner(false);

    if (res.ok) {
      return users;
    }

    if (res.status === 401) {
      toastErrorDark('Invalid token. Please, log in again');
      logoutUser();
    } else if (res.status >= 400 && res.status <= 499) {
      toastErrorDark('Users not found or query error');
    } else if (res.status >= 500) {
      toastWarnDark('Server Error');
    }
  }

  return defData;
};

export default getAllUsers;
