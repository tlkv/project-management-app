export default function API_LOGIN_WITH_TOKEN(
  token: string,
  login: string,
  dispatchIsAuth: React.Dispatch<React.SetStateAction<boolean>>
): void {
  localStorage.setItem('token', token);
  dispatchIsAuth(true);
}
