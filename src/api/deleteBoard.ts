import { API_URL } from '../data/constants';

export default async function deleteBoard(id: string) {
  const url = `${API_URL}/boards/${id}`;
  const token = localStorage.getItem('token') || '';

  try {
    await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}
