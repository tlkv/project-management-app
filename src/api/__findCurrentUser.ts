import { API_URL } from '../data/constants';
import { ApiUserInfo } from '../data/interfacesA';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import decodeToken from './decodeToken';

const findCurrentUser = async (
  logoutUser: () => void,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { token, id } = decodeToken();

  const defUser: ApiUserInfo = {
    login: '',
    id: '',
    name: '',
  };

  if (!token) {
    toastErrorDark('Invalid token. Please, sign in again');
    logoutUser();
    return defUser;
  }

  const options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  let res = {} as Response;
  let user = { ...defUser };
  setSpinner(true);
  try {
    res = await fetch(`${API_URL}/users/${id}`, options);
    user = await res.json();
  } catch (err) {
    toastErrorDark('No response from server');
    setSpinner(false);
    return defUser;
  }

  setSpinner(false);

  if (res.ok) {
    return user;
  }

  if (res.status === 401) {
    toastErrorDark('Not authorized or credentials expired. Please, log in again');
    logoutUser();
  } else if (res.status >= 400 && res.status <= 499) {
    toastErrorDark('User not found or query error');
  } else if (res.status >= 500) {
    toastWarnDark('Server Error');
  }

  return defUser;
};

export default findCurrentUser;
