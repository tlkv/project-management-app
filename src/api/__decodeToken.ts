import jwtDecode from 'jwt-decode';
import { JwtToken } from '../data/interfacesA';

const decodeToken = () => {
  const token = localStorage.getItem('pmapp34-token') || '';
  if (!token) {
    return { token: '', id: '', login: '' };
  }
  const encoded: JwtToken = jwtDecode(token);
  const id = encoded.userId || '';
  const login = encoded.login || '';
  return { token, id, login };
};

export default decodeToken;
