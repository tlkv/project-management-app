/* eslint-disable react-hooks/exhaustive-deps */
import './ProfilePage.scss';

import { Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { API_URL } from '../../data/constants';
import { AppContext } from '../../App';
import getAllUsers from '../../api/getAllUsers';
import findUser from '../../api/findUser';
import { ApiUserQuery } from '../../data/interfacesA';

/* 
const updateUser = async () => {
  const all = await getAllUsers();
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
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ApiUserQuery>();
  const navigate = useNavigate();

  const { isAuth } = useContext(AppContext);

  const userLogin = localStorage.getItem('login') || '';
  const userToken = localStorage.getItem('token') || '';
  const handleCurrentUser = async () => {
    const res = await findUser(userToken, userLogin);
    console.log(res);
  };
  useEffect(() => {
    /* if (!isAuth) {
      navigate('/welcome');
    } */
    handleCurrentUser();
  }, []);

  /* useEffect(() => {
    if (!isAuth) {
      navigate('/welcome');
    }
  }, [isAuth]); */

  return (
    <div className="narrow-container profile-container">
      <h1 className="title">Profile</h1>
      <img src="./assets/img/userIcon.png" alt="user icon" className="user-img" />
      <div>Welcome, {userLogin}!</div>
      <div>userName: {userLogin}!</div>
      <div>userId: {userLogin}!</div>
      <button type="button" onClick={handleCurrentUser}>
        handleCurrentUser
      </button>
    </div>
  );
}

export default ProfilePage;
