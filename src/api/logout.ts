export default function API_LOGOUT(
  dispatchIsAuth: React.Dispatch<React.SetStateAction<boolean>>
): void {
  localStorage.removeItem('login');
  localStorage.removeItem('token');
  dispatchIsAuth(false);
}
