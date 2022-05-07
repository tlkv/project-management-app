export default function IS_NAME_OR_LOGIN_VALID(input: string): boolean {
  const regex = /^[a-zA-Zа-яА-Я]+$/i;
  return regex.test(input);
}
