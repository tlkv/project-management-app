import { API_URL } from '../data/constants';
import { ApiUserInfo } from '../data/interfacesA';
import decodeToken from './decodeToken';

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
  const res = await fetch(`${API_URL}/users/${id}`, options);
  if (res.ok) {
    const user: ApiUserInfo = await res.json();
    return user;
  }
  return false;
};

export default updateUser;
