import { useNavigate } from 'react-router-dom';

export default function Logout(
  dispatchIsAuth: React.Dispatch<React.SetStateAction<boolean>>
): void {
  const navigate = useNavigate();
  localStorage.removeItem('pmapp34-token');
  dispatchIsAuth(false);
  navigate('/welcome');
}
