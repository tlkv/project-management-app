import { API_URL } from '../data/constants';
import { ColumnsResponse } from '../data/interfacesV';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import validateUser from './_validateUser';

export default async function createColumn(
  id: string,
  title: string,
  logoutUser: () => void,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>
) {
  // setSpinner(true);

  const userData = await validateUser(logoutUser, setSpinner);

  if (userData) {
    setSpinner(true);

    const url = `${API_URL}/boards/${id}/columns`;

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
      }),
    };

    let res = {} as Response;
    let column = {} as ColumnsResponse;

    try {
      res = await fetch(url, options);
      column = await res.json();
    } catch {
      toastErrorDark('No response from server');
      setSpinner(false);
      return false;
    }

    setSpinner(false);

    if (res.ok) {
      return column;
    }

    if (res.status === 401) {
      toastErrorDark('Invalid token. Please, log in again');
      logoutUser();
    } else if (res.status >= 400 && res.status <= 499) {
      toastErrorDark('Bad query or conflict with another user session');
    } else if (res.status >= 500) {
      toastWarnDark('Server Error');
    }

    // return false;
  }

  return false;
}
