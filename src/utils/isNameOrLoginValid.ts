export default function IS_NAME_OR_LOGIN_VALID(input: string): boolean {
  const regex = /^[A-Za-z0-9]\w{3,}$/;
  return regex.test(input);
}
