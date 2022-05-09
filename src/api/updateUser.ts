import jwtDecode from 'jwt-decode';
import { API_URL } from '../data/constants';
import { ApiUserInfo, jwtToken } from '../data/interfacesA';

const updateUser = async (name: string, login: string, password: string) => {
  const token = localStorage.getItem('token') || '';
  const encoded: jwtToken = jwtDecode(token);
  const id = encoded.userId || '';
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
