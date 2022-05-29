import { API_URL } from '../data/constants';
import { toastErrorDark, toastSuccessDark, toastWarnDark } from '../utils/toast';
import decodeToken from './__decodeToken';

const deleteUser = async (logoutUser: () => void) => {
  const { token, id } = decodeToken();

  if (!token) {
    toastErrorDark('Invalid token. Please, sign in again');
    logoutUser();
    return false;
  }

  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let res = {} as Response;

  try {
    res = await fetch(`${API_URL}/users/${id}`, options);
  } catch (err) {
    toastErrorDark('No response from server');
    return false;
  }

  if (res.ok) {
    toastSuccessDark('Successfully removed user');
    logoutUser();
  } else if (res.status === 401) {
    toastErrorDark('Invalid token. Please, log in again');
    logoutUser();
  } else if (res.status >= 400 && res.status <= 499) {
    toastErrorDark('User not found');
  } else if (res.status >= 500) {
    toastWarnDark('Server Error');
  }

  return false;
};

export default deleteUser;
