import { API_URL } from '../data/constants';
import { ApiUserInfo } from '../data/interfacesA';

const getAllUsers = async (token: string) => {
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
