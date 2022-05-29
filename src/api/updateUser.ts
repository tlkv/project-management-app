import { API_URL } from '../data/constants';
import { ApiUserInfo } from '../data/interfacesA';
import { toastErrorDark, toastInfoDark, toastWarnDark } from '../utils/toast';
import validateUser from './_validateUser';

const updateUser = async (
  name: string,
  login: string,
  password: string,
  logoutUser: () => void,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setSpinner(true);
  const userData = await validateUser(logoutUser, setSpinner);
  if (userData) {
    setSpinner(true);

    const options = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, login, password }),
    };

    let res = {} as Response;

    let user: ApiUserInfo = {
      login: '',
      id: '',
      name: '',
    };

    try {
      res = await fetch(`${API_URL}/users/${userData.id}`, options);
      user = await res.json();
    } catch (err) {
      toastErrorDark('No response from server');
      setSpinner(false);
      return false;
    }

    setSpinner(false);
    if (res.ok) {
      toastInfoDark('Successfully updated user info');
      return user;
    }

    if (res.status === 401) {
      toastErrorDark('Invalid token. Please, log in again');
      logoutUser();
    } else if (res.status >= 400 && res.status <= 499) {
      toastErrorDark('User not found or query error');
    } else if (res.status >= 500) {
      toastWarnDark('Login is taken or Server Error');
    }

    return false;
  }

  return false;
};

export default updateUser;
