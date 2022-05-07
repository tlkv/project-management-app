import { API_URL } from '../data/constants';

export default async function API_GET_RESPONSE_ON_CREATING_USER(
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
