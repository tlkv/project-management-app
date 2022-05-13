import { API_URL } from '../data/constants';

export default async function createBoard(title: string, description: string) {
  const url = `${API_URL}/boards`;
  const token = localStorage.getItem('pmapp34-token') || '';
  const board = {
    title,
    description,
  };

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(board),
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}
