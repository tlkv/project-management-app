import { API_URL } from '../data/constants';
import { BoardsResponse } from '../data/interfaces';

export default async function createBoard(title: string) {
  const url = `${API_URL}/boards`;
  const token = localStorage.getItem('pmapp34-token') || '';
  const board = {
    title,
  };
  let data: BoardsResponse = { id: '', title: '' };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(board),
    });
    data = await res.json();
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
  return data;
}
