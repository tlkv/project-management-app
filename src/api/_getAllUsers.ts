import { API_URL } from '../data/constants';
import { ApiUserInfo } from '../data/interfacesA';
import decodeToken from './decodeToken';

const getAllUsers = async () => {
  const { token } = decodeToken();
  const defData: ApiUserInfo[] = [];
  const options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(`${API_URL}/users`, options);
  if (res.ok) {
    const users: ApiUserInfo[] = await res.json();
    return users;
  }
  if (res.status >= 400) {
    // logout
  }
  return defData;
};

export default getAllUsers;
