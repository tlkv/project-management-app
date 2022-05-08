import { ApiUserInfo } from '../data/interfacesA';
import getAllUsers from './getAllUsers';

const findUser = async (token: string, login: string) => {
  const defUser: ApiUserInfo = {
    login: '',
    id: '',
    name: 'anonymous',
  };
  const all = await getAllUsers(token);
  const match = all.find((i) => i.login === login);
  return match || defUser;
};

export default findUser;
