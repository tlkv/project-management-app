export default function IS_PASSWORD_VALID(password: string): boolean {
  const regex = /^[A-Za-z0-9]\w{7,}$/;
  return regex.test(password);
}
