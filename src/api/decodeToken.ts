import jwtDecode from 'jwt-decode';
import { JwtToken } from '../data/interfacesA';

const decodeToken = () => {
  const token = localStorage.getItem('token') || '';
  const encoded: JwtToken = jwtDecode(token);
  const id = encoded.userId || '';
  const login = encoded.login || '';
  return { token, id, login };
};

export default decodeToken;
