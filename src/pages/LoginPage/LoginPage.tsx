import { useContext, useState } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import './LoginPage.scss';
import { AppContext } from '../../App';
import AuthPopup from './AuthPopup/AuthPopup';
import API_GET_TOKEN from '../../api/getToken';
import API_LOGIN_WITH_TOKEN from '../../api/loginWithToken';
import API_GET_RESPONSE_ON_CREATING_USER from '../../api/getResponseOnCreatingUser';
import IS_PASSWORD_VALID from '../../utils/isPasswordValid';
import IS_NAME_OR_LOGIN_VALID from '../../utils/isNameOrLoginValid';

function LoginPage() {
  const context = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/login';
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [login, setLogin] = useState('');
  const [isLoginValid, setIsLoginValid] = useState(true);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsNameValid(true);
  };
  const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
    setIsLoginValid(true);
  };
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordValid(true);
  };
  const createUser = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const isInputDataValid =
      IS_NAME_OR_LOGIN_VALID(name) && IS_NAME_OR_LOGIN_VALID(login) && IS_PASSWORD_VALID(password);
    if (!isInputDataValid) {
      setIsNameValid(IS_NAME_OR_LOGIN_VALID(name));
      setIsLoginValid(IS_NAME_OR_LOGIN_VALID(login));
      setIsPasswordValid(IS_PASSWORD_VALID(password));
      return;
    }
    const response = await API_GET_RESPONSE_ON_CREATING_USER(name, login, password);
    if (response.status === 201) {
      const token = await API_GET_TOKEN(login, password);
      API_LOGIN_WITH_TOKEN(token as string, login, context.setIsAuth);
      navigate('/');
      return;
    }
    if (response.status === 409) {
      setPopupMessage('This login already exists');
      setIsPopupShown(true);
    }
  };

  const logIn = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const isInputDataValid = IS_NAME_OR_LOGIN_VALID(login) && IS_PASSWORD_VALID(password);
    if (!isInputDataValid) {
      setIsLoginValid(IS_NAME_OR_LOGIN_VALID(login));
      setIsPasswordValid(IS_PASSWORD_VALID(password));
      return;
    }
    const token = await API_GET_TOKEN(login, password);
    if (token) {
      API_LOGIN_WITH_TOKEN(token, login, context.setIsAuth);
      navigate('/');
      return;
    }
    setPopupMessage('Wrong login or password');
    setIsPopupShown(true);
  };

  return (
    <div className="narrow-container">
      <h1 className="login__title">
        {isLogin ? 'Already with us?' : 'Sign up in project management app'}
      </h1>
      <p className="login__description">{isLogin ? 'Sign in in project management app' : null}</p>
      <form className="login__form">
        {isLogin ? null : (
          <div className="login__form-field login__form-field_text">
            <label htmlFor="name">
              Name
              <input
                className="registration__form_input"
                type="text"
                placeholder="Enter your name"
                id="name"
                value={name}
                onInput={handleNameInput}
              />
            </label>
            {isNameValid ? null : (
              <div className="login__invalid-field">Name must contain only letters</div>
            )}
          </div>
        )}
        <div className="login__form-field login__form-field_text">
          <label htmlFor="login">
            Login
            <input
              className="login__form_input"
              type="text"
              placeholder="Enter your login"
              id="login"
              onInput={handleLoginInput}
            />
          </label>
          {isLoginValid ? null : (
            <div className="login__invalid-field">Login must contain only letters</div>
          )}
        </div>
        <div className="login__form-field login__form-field_text">
          <label htmlFor="password">
            Password
            <input
              className="login__form_input"
              type="password"
              placeholder="Enter your password"
              id="password"
              onInput={handlePasswordInput}
            />
          </label>
          {isPasswordValid ? null : (
            <div className="login__invalid-field">Password must contain at least 8 characters</div>
          )}
        </div>
        {isLogin ? (
          <input
            className="login__form_submit"
            type="submit"
            value="Sign in"
            disabled={!(login && password)}
            onClick={logIn}
          />
        ) : (
          <input
            className="login__form_submit"
            type="submit"
            value="Sign up"
            disabled={!(name && login && password)}
            onClick={createUser}
          />
        )}
      </form>
      {isLogin ? (
        <p className="login__suggestion">
          Not with us? So&nbsp;
          <NavLink className="login__link" to="/registration">
            sign up!
          </NavLink>
        </p>
      ) : (
        <p className="login__suggestion">
          Already with us? So&nbsp;
          <NavLink className="login__link" to="/login">
            sign in!
          </NavLink>
        </p>
      )}
      {isPopupShown ? <AuthPopup message={popupMessage} setIsPopupShown={setIsPopupShown} /> : null}
    </div>
  );
}

export default LoginPage;
