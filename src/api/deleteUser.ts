import { API_URL } from '../data/constants';
import { toastErrorDark, toastSuccessDark, toastWarnDark } from '../utils/toast';
import decodeToken from './decodeToken';

const deleteUser = async () => {
  const { token, id } = decodeToken();
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
    return res;
  }
  if (res.status >= 400 && res.status <= 499) {
    toastErrorDark('User not found');
  }
  if (res.status >= 500) {
    toastWarnDark('Server Error');
  }
  return false;
};

export default deleteUser;
