/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import './ProfilePage.scss';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
    /* handleSubmit,
    reset,
    getValues, */
    setValue,
    formState: { errors },
  } = useForm<ApiUserQuery>();
  // const navigate = useNavigate();

  // const userLogin = localStorage.getItem('login') || '';
  // const userToken = localStorage.getItem('token') || '';
  const handleCurrentUser = async () => {
    const res = await findUser();
    setValue('name', res.name);
    setValue('login', res.login);
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
  /* const onSubmit = handleSubmit(({ name, login, password }) => {
    console.log(name, login, password);
  }); */

  return (
    <div className="narrow-container profile-container">
      <h1 className="title">Profile</h1>
      <img src="./assets/img/userIcon.png" alt="user icon" className="user-img" />
      <div>Welcome, !</div>
      <div>userName: !</div>
      <div>userId: !</div>
      <button type="button" onClick={handleCurrentUser}>
        handleCurrentUser
      </button>
      <h3>FORM</h3>
      <form /* onSubmit={onSubmit} */ className="user-controls">
        <div className="profile-field">
          <label htmlFor="form-name">
            Name:
            <input
              id="form-name"
              type="text"
              className="form-name"
              {...register('name', { required: true })}
            />
          </label>
          {errors.name && <div className="valid-err">Name is required</div>}
        </div>
        <div className="profile-field">
          <label htmlFor="form-login">
            Login:
            <input
              id="form-login"
              type="text"
              className="form-login"
              {...register('login', { required: true })}
            />
          </label>
          {errors.login && <div className="valid-err">Login is required</div>}
        </div>
        <div className="profile-field">
          <label htmlFor="form-password">
            Password:
            <input
              id="form-password"
              type="password"
              className="form-password"
              {...register('password', { required: true })}
            />
          </label>
          {errors.password && (
            <div className="valid-err">Password should be at least 8 symbols</div>
          )}
        </div>
        <input type="submit" value="Save" className="save-button" />
      </form>
      <h3>Delete user</h3>
      <button type="button">Delete User</button>
    </div>
  );
}

export default ProfilePage;
