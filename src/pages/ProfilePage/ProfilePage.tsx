/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import './ProfilePage.scss';

import { Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../App';
import findCurrentUser from '../../api/findCurrentUser';
import { ApiUserQuery } from '../../data/interfacesA';
import updateUser from '../../api/updateUser';
import ModalConfirm from '../../components/ModalConfirm/ModalConfirm';
import deleteUser from '../../api/deleteUser';
import API_LOGOUT from '../../api/logout';

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
  const { setIsAuth } = useContext(AppContext);
  const [isModalOpen, showModal] = useState(false);
  const [currName, setCurrName] = useState('');
  const [currLogin, setCurrLogin] = useState('');
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
  const handleCurrentUser = async () => {
    const res = await findCurrentUser();
    console.log('findCurrentUser', res);
    setValue('name', res.name);
    setValue('login', res.login);
    setCurrName(res.name);
    setCurrLogin(res.login);
    // setValue
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
  const onSubmit = handleSubmit(async ({ name, login, password }) => {
    console.log({ name, login, password });
    await updateUser(name, login, password);
    setCurrName(name);
    setCurrLogin(login);
  });

  const onDelete = async () => {
    await deleteUser();
    API_LOGOUT(setIsAuth);
    navigate('/welcome');
  };

  return (
    <>
      <div className="narrow-container profile-container">
        <h1 className="title">Profile</h1>
        <img src="./assets/img/userIcon.png" alt="user icon" className="user-img" />
        <div>Name: {currName}!</div>
        <div>Login: {currLogin}</div>
        <h3>Edit profile</h3>
        <form onSubmit={onSubmit} className="user-controls">
          <div className="profile-field">
            <label htmlFor="form-name">
              Name:
              <input
                id="form-name"
                type="text"
                className="form-name"
                {...register('name', { required: true, pattern: /^[A-Za-z0-9]\w{3,}$/ })}
              />
            </label>
            {errors.name && <div className="valid-err">Name should be at least 4 symbols</div>}
          </div>
          <div className="profile-field">
            <label htmlFor="form-login">
              Login:
              <input
                id="form-login"
                type="text"
                className="form-login"
                {...register('login', { required: true, pattern: /^[A-Za-z0-9]\w{3,}$/ })}
              />
            </label>
            {errors.login && <div className="valid-err">Login should be at least 4 symbols</div>}
          </div>
          <div className="profile-field">
            <label htmlFor="form-password">
              Password:
              <input
                id="form-password"
                type="password"
                className="form-password"
                autoComplete="on"
                {...register('password', { required: true, pattern: /^[A-Za-z0-9]\w{7,}$/ })}
              />
            </label>
            {errors.password && (
              <div className="valid-err">Password should be at least 8 symbols</div>
            )}
          </div>
          <input type="submit" value="Save" className="save-button" />
        </form>
        <h3>Delete profile</h3>
        {/* <button type="button" onClick={onDelete}>
          Delete User
        </button> */}
        <button type="button" onClick={() => showModal(true)}>
          Delete Modal
        </button>
      </div>
      {isModalOpen && (
        <ModalConfirm
          showModal={showModal}
          message={
            <>
              Remove this user? <br /> This action is irreversible!
            </>
          }
          modalCallback={onDelete}
        />
      )}
    </>
  );
}

export default ProfilePage;
