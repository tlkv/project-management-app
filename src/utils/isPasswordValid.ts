export default function IS_PASSWORD_VALID(password: string, rule: RegExp): boolean {
  return rule.test(password);
}
