/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import './ProfilePage.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../App';
import findCurrentUser from '../../api/findCurrentUser';
import { ApiUserQuery } from '../../data/interfacesA';
import updateUser from '../../api/updateUser';
import ModalConfirm from '../../components/ModalConfirm/ModalConfirm';
import deleteUser from '../../api/deleteUser';
import logout from '../../api/logout';

function ProfilePage() {
  const notify = () => toast('Wow so easy!');
  const { setIsAuth } = useContext(AppContext);
  const [isModalOpen, showModal] = useState(false);
  const [currName, setCurrName] = useState('');
  const [currLogin, setCurrLogin] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ApiUserQuery>();
  const navigate = useNavigate();

  const handleCurrentUser = async () => {
    const res = await findCurrentUser();
    setValue('name', res.name);
    setValue('login', res.login);
    setCurrName(res.name);
    setCurrLogin(res.login);
  };
  useEffect(() => {
    handleCurrentUser();
  }, []);

  const onSubmit = handleSubmit(async ({ name, login, password }) => {
    await updateUser(name, login, password);
    setCurrName(name);
    setCurrLogin(login);
  });

  const onDelete = async () => {
    await deleteUser();
    logout(setIsAuth);
    navigate('/welcome');
  };

  return (
    <>
      <div className="narrow-container profile-container">
        <div>
          <button type="button" onClick={notify}>
            Notify!
          </button>
          <ToastContainer />
        </div>
        <h1 className="title">Profile</h1>
        <div className="profile-description">
          <div className="prof-descr-item">
            <img src="./assets/img/userIcon.png" alt="user icon" className="user-img" />
          </div>
          <div className="prof-descr-item">
            <div className="prof-descr-text">
              <span>Name:</span> {currName}
            </div>
            <div className="prof-descr-text">
              <span>Login:</span> {currLogin}
            </div>
          </div>
        </div>
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
                  {...register('name', { required: true, pattern: /^[A-Za-z0-9]\w{3,}$/ })}
                />
              </label>
              {errors.name && <div className="valid-err">Name should be at least 4 symbols</div>}
            </div>
            <div className="profile-field">
              <label htmlFor="form-login">
                Login
                <input
                  id="form-login"
                  type="text"
                  className="form-login user-edit-input"
                  {...register('login', { required: true, pattern: /^[A-Za-z0-9]\w{3,}$/ })}
                />
              </label>
              {errors.login && <div className="valid-err">Login should be at least 4 symbols</div>}
            </div>
            <div className="profile-field">
              <label htmlFor="form-password">
                Password
                <input
                  id="form-password"
                  type="password"
                  className="form-password  user-edit-input"
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
        </div>
        <button type="button" className="delete-profile" onClick={() => showModal(true)}>
          Delete my account
        </button>
      </div>
      {isModalOpen && (
        <ModalConfirm
          showModal={showModal}
          message={
            <>
              Are you sure? <br /> This action is irreversible!
            </>
          }
          modalCallback={onDelete}
        />
      )}
    </>
  );
}

export default ProfilePage;
