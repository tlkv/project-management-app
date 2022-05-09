import jwtDecode from 'jwt-decode';
import { ApiUserInfo, jwtToken } from '../data/interfacesA';
import getUser from './getUser';

const findUser = async () => {
  const token = localStorage.getItem('token') || '';
  const encoded: jwtToken = jwtDecode(token);
  const id = encoded.userId || '';
  // console.log('encoded.userId', encoded.userId);
  const user: ApiUserInfo = await getUser(id);

  /* const all = await getAllUsers(token);
  const match = all.find((i) => i.login === login); */
  return user;
};

export default findUser;
