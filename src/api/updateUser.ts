import { API_URL } from '../data/constants';
import { ApiUserInfo } from '../data/interfacesA';
import decodeToken from './decodeToken';
import { toastErrorDark, toastInfoDark, toastWarnDark } from '../utils/toast';
import findCurrentUser from './findCurrentUser';

const updateUser = async (
  name: string,
  login: string,
  password: string,
  logoutUser: () => void
) => {
  /* const thisUser = await findCurrentUser(logoutUser);
  console.log('thisUser', thisUser); */
  const { token, id } = decodeToken();

  if (!token) {
    toastErrorDark('Invalid token. Please, sign in again');
    logoutUser();
    return false;
  }

  const options = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
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
    res = await fetch(`${API_URL}/users/${id}`, options);
    user = await res.json();
  } catch (err) {
    toastErrorDark('No response from server');
    return false;
  }

  if (res.ok) {
    toastInfoDark('Successfully updated user info');
    return user;
  }

  if (res.status === 401) {
    toastErrorDark('Not authorized or credentials expired. Please, log in again');
    logoutUser();
  } else if (res.status >= 400 && res.status <= 499) {
    toastErrorDark('User not found or query error');
  } else if (res.status >= 500) {
    toastWarnDark('Login is taken or Server Error');
  }

  return false;
};

export default updateUser;
