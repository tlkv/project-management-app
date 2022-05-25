/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import './ProfilePage.scss';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../App';
import findCurrentUser from '../../api/findCurrentUser';
import { ApiUserQuery } from '../../data/interfacesA';
import updateUser from '../../api/updateUser';
import ModalConfirm from '../../components/ModalConfirm/ModalConfirm';
import deleteUser from '../../api/deleteUser';
import { passRegExp, userRegExp } from '../../data/constantsA';
import UserInfo from '../../components/UserInfo/UserInfo';

function ProfilePage() {
  const { logoutUser, isAuth } = useContext(AppContext);
  const [isModalOpen, showModal] = useState(false);
  const [currName, setCurrName] = useState('');
  const [currLogin, setCurrLogin] = useState('');
  const [currId, setCurrId] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ApiUserQuery>();
  const navigate = useNavigate();

  const handleCurrentUser = async () => {
    const res = await findCurrentUser(logoutUser);
    setValue('name', res.name);
    setValue('login', res.login);
    setCurrName(res.name);
    setCurrLogin(res.login);
    setCurrId(res.id);
  };

  useEffect(() => {
    if (!isAuth && !localStorage.getItem('pmapp34-token')) {
      navigate('/welcome');
    } else {
      handleCurrentUser();
    }
  }, [isAuth]);

  const onSubmit = handleSubmit(async ({ name, login, password }) => {
    const result = await updateUser(name, login, password, logoutUser);
    if (result) {
      setCurrName(name);
      setCurrLogin(login);
    }
  });

  const onDelete = async () => {
    await deleteUser(logoutUser);
  };

  return (
    <>
      <div className="narrow-container profile-container">
        <h1 className="title">Profile</h1>
        <UserInfo name={currName} login={currLogin} id={currId} />
        <div className="form-wrapper">
          <h3>Edit profile</h3>
          <form onSubmit={onSubmit} className="user-controls">
            <div className="profile-field">
              <label htmlFor="form-name">
                Name
                <input
                  id="form-name"
                  type="text"
                  className="form-name  user-edit-input"
                  placeholder="Enter your name"
                  {...register('name', { required: true, pattern: /^[A-Za-z0-9]\w{3,}$/ })}
                />
              </label>
              {errors.name && (
                <div className="valid-err">
                  At least 4 letters (eng) or numbers, no spaces or special symbols
                </div>
              )}
            </div>
            <div className="profile-field">
              <label htmlFor="form-login">
                Login
                <input
                  id="form-login"
                  type="text"
                  className="form-login user-edit-input"
                  placeholder="Enter your login"
                  {...register('login', { required: true, pattern: userRegExp })}
                />
              </label>
              {errors.login && (
                <div className="valid-err">
                  At least 4 letters (eng) or numbers, no spaces or special symbols
                </div>
              )}
            </div>
            <div className="profile-field">
              <label htmlFor="form-password">
                Password
                <input
                  id="form-password"
                  type="password"
                  className="form-password  user-edit-input"
                  autoComplete="on"
                  placeholder="Enter your password"
                  {...register('password', { required: true, pattern: passRegExp })}
                />
              </label>
              {errors.password && (
                <div className="valid-err">
                  At least 8 letters (eng) or numbers, no spaces or special symbols
                </div>
              )}
            </div>
            <input type="submit" value="Save" className="save-button" />
          </form>
        </div>
        <button type="button" className="delete-profile" onClick={() => showModal(true)}>
          Delete my account
        </button>
      </div>
      {isModalOpen && (
        <ModalConfirm
          showModal={showModal}
          message={
            <p>
              Are you sure? <br /> This action is irreversible!
            </p>
          }
          modalCallback={onDelete}
        />
      )}
    </>
  );
}

export default ProfilePage;
