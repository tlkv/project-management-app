export default function logout(
  dispatchIsAuth: React.Dispatch<React.SetStateAction<boolean>>
): void {
  localStorage.removeItem('pmapp34-token');
  dispatchIsAuth(false);
}
