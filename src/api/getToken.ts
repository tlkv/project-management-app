import { API_URL } from '../data/constants';

export default async function API_GET_TOKEN(
  login: string,
  password: string
): Promise<string | false> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login,
      password,
    }),
  };
  const response = await fetch(`${API_URL}/signin`, options);
  if (response.status === 201) {
    const body = await response.json();
    return body.token;
  }
  return false;
}
