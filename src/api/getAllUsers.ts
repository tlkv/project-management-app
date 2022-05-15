import { API_URL } from '../data/constants';
import { ApiUserInfo } from '../data/interfacesA';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import decodeToken from './decodeToken';

const getAllUsers = async () => {
  const defData: ApiUserInfo[] = [];
  const { token } = decodeToken();
  if (!token) {
    toastErrorDark('Invalid token');
    return defData;
  }
  const options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  let res = {} as Response;
  let users: ApiUserInfo[] = [];
  try {
    res = await fetch(`${API_URL}/users`, options);
    users = await res.json();
  } catch (err) {
    toastErrorDark('No response from server');
    return defData;
  }
  if (res.ok) {
    return users;
  }
  if (res.status >= 400 && res.status <= 499) {
    toastErrorDark('Not authorized or query error');
  }
  if (res.status >= 500) {
    toastWarnDark('Server Error');
  }
  return defData;
};

export default getAllUsers;
