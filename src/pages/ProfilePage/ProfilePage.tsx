import './ProfilePage.scss';

import { API_URL } from '../../data/constants';

interface ApiUserData {
  login: string;
  id: string;
  name: string;
}

/* export const allUsers = async () => {
  let data: ApiUserData[] = [];
  try {
    const res = await fetch(`${API_URL}/users`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${tokenLs}`,
      },
    });
    data = await res.json();
  } catch (err) {
    throw new Error('API request failed');
  }
  return data;
};

const updateUser = async () => {
  const all = await allUsers();
  const match = all.find((i) => i.login === loginLs);
  console.log('this user', match);
};

export const apiHello = async () => {
  const res = await fetch(API_URL);
  const data = await res.text();
  console.log(data);
  if (res.ok) {
    updateUser();
  }
}; */

function ProfilePage() {
  return (
    <div className="narrow-container profile-container">
      <h1 className="title">Profile</h1>
      <img src="./assets/img/userIcon.png" alt="user icon" className="user-img" />
      <div>Welcome, {localStorage.getItem('login')}</div>
    </div>
  );
}

export default ProfilePage;
