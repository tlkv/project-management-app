export default function IS_NAME_OR_LOGIN_VALID(input: string, rule: RegExp): boolean {
  return rule.test(input);
}
