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
  return defData;
};

export default getAllUsers;
