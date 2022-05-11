import { API_URL } from '../data/constants';

export default async function getResponseOnCreatingUser(
  name: string,
  login: string,
  password: string
): Promise<Response> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      login,
      password,
    }),
  };
  const response = await fetch(`${API_URL}/signup`, options);
  return response;
}
