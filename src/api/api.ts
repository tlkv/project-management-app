import { API_URL } from '../data/constants';
import { BoardsResponse } from '../data/interfaces';

let token = localStorage.getItem('token') || '';

const signUp = async () => {
  const url = `${API_URL}/signup`;
  const user = {
    name: 'vitali',
    login: 'tester',
    password: 'userpass@123',
  };
  let data = {
    id: '',
    title: '',
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    data = await res.json();
  } catch (err) {
    throw new Error('API request failed');
  }
  return data;
};

const signIn = async () => {
  const url = `${API_URL}/signin`;
  const user = {
    login: 'tester',
    password: 'userpass@123',
  };
  let data = null;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    data = await res.json();
    token = data.token;
    localStorage.setItem('token', data.token);
  } catch (err) {
    throw new Error('API request failed');
  }
  return data;
};

const getBoards = async () => {
  const url = `${API_URL}/boards`;
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
};

const createBoard = async (title: string) => {
  const url = `${API_URL}/boards`;
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
};

const deleteBoard = async (id: string) => {
  const url = `${API_URL}/boards/${id}`;

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
};

export { signUp, signIn, getBoards, createBoard, deleteBoard };
