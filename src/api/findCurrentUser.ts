import { API_URL } from '../data/constants';
import { ApiUserInfo } from '../data/interfacesA';
import decodeToken from './decodeToken';

const findCurrentUser = async () => {
  const { token, id } = decodeToken();
  const defUser: ApiUserInfo = {
    login: '',
    id: '',
    name: 'name',
  };
  const options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(`${API_URL}/users/${id}`, options);
  if (res.ok) {
    const user: ApiUserInfo = await res.json();
    return user;
  }
  return defUser;
};

export default findCurrentUser;
