import { API_URL } from '../data/constants';
import { ApiUserInfo } from '../data/interfacesA';
import decodeToken from './decodeToken';
import { toastErrorDark, toastSuccessDark, toastWarnDark } from '../utils/toast';

const updateUser = async (name: string, login: string, password: string) => {
  const { token, id } = decodeToken();
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

  try {
    res = await fetch(`${API_URL}/users/${id}`, options);
  } catch (err) {
    toastErrorDark('No response from server');
    return false;
  }
  if (res.ok) {
    const user: ApiUserInfo = await res.json();
    toastSuccessDark('Successfully saved');
    return user;
  }
  if (res.status >= 400 && res.status <= 499) {
    toastErrorDark('User not found');
  }
  if (res.status >= 500) {
    toastWarnDark('Selected login is taken');
  }

  return false;
};

export default updateUser;
