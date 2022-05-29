import { API_URL } from '../data/constants';
import { toastErrorDark, toastSuccessDark, toastWarnDark } from '../utils/toast';
import validateUser from './_validateUser';

const deleteUser = async (
  logoutUser: () => void,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const userData = await validateUser(logoutUser, setSpinner);

  if (userData) {
    setSpinner(true);

    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    let res = {} as Response;

    try {
      res = await fetch(`${API_URL}/users/${userData.id}`, options);
    } catch (err) {
      toastErrorDark('No response from server');
      setSpinner(false);
      return false;
    }

    setSpinner(false);

    if (res.ok) {
      toastSuccessDark('Successfully removed user');
      logoutUser();
      return true;
    }

    if (res.status === 401) {
      toastErrorDark('Invalid token. Please, log in again');
      logoutUser();
    } else if (res.status >= 400 && res.status <= 499) {
      toastErrorDark('User not found or client error');
    } else if (res.status >= 500) {
      toastWarnDark('Server Error');
    }
  }

  return false;
};

export default deleteUser;
