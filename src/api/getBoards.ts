import { API_URL } from '../data/constants';
import { BoardsResponse } from '../data/interfaces';

export default async function getBoards() {
  const url = `${API_URL}/boards`;
  const token = localStorage.getItem('pmapp34-token') || '';
  let data: BoardsResponse[] = [{ id: '', title: '' }];
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    data = await res.json();
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
  return data;
}
