import { userRegExp } from '../data/constantsA';

export default function IS_NAME_OR_LOGIN_VALID(input: string): boolean {
  const regex = userRegExp;
  return regex.test(input);
}
