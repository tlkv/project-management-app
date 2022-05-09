import { API_URL } from '../data/constants';
import decodeToken from './decodeToken';

const deleteUser = async () => {
  const { token, id } = decodeToken();
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(`${API_URL}/users/${id}`, options);
  if (res.ok) {
    return res;
  }
  return false;
};

export default deleteUser;
