import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import './LoginPage.scss';
import { AppContext } from '../../App';
import getToken from '../../api/getToken';
import loginWithToken from '../../api/loginWithToken';
import getResponseOnCreatingUser from '../../api/getResponseOnCreatingUser';
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
  const { isAuth, setSpinner } = useContext(AppContext);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (isAuth && localStorage.getItem('pmapp34-token')) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

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
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), 1500);
    const isInputDataValid =
      IS_NAME_OR_LOGIN_VALID(name) && IS_NAME_OR_LOGIN_VALID(login) && IS_PASSWORD_VALID(password);
    if (!isInputDataValid) {
      setIsNameValid(IS_NAME_OR_LOGIN_VALID(name));
      setIsLoginValid(IS_NAME_OR_LOGIN_VALID(login));
      setIsPasswordValid(IS_PASSWORD_VALID(password));
      return;
    }
    const response = await getResponseOnCreatingUser(name, login, password, setSpinner);
    if (response.ok) {
      const token = await getToken(login, password, setSpinner);
      loginWithToken(token as string, context.setIsAuth);
      navigate('/');
    }
  };

  const logIn = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), 1500);
    const isInputDataValid = IS_NAME_OR_LOGIN_VALID(login) && IS_PASSWORD_VALID(password);
    if (!isInputDataValid) {
      setIsLoginValid(IS_NAME_OR_LOGIN_VALID(login));
      setIsPasswordValid(IS_PASSWORD_VALID(password));
      return;
    }
    const token = await getToken(login, password, setSpinner);
    if (token) {
      loginWithToken(token, context.setIsAuth);
      navigate('/');
    }
  };

  return (
    <div className="narrow-container">
      <h1 className="login__title">{isLogin ? 'Already with us?' : 'Create new account'}</h1>
      <p className="login__description">
        {isLogin ? 'Sign in to RS Project Management App' : 'Sign up to RS Project Management App'}
      </p>
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
              <div className="login__invalid-field">
                4-20 letters (eng) or numbers, no spaces or special symbols
              </div>
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
            <div className="login__invalid-field">
              4-20 letters (eng) or numbers, no spaces or special symbols
            </div>
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
            <div className="login__invalid-field">
              8-30 letters (eng) or numbers or ! @ # $ & ( ) - ‘ . / + ,
            </div>
          )}
        </div>
        {isLogin ? (
          <input
            className={`login__form_submit ${isButtonDisabled ? 'temp-disabled' : ''}`}
            type="submit"
            value="Sign in"
            disabled={!(login && password)}
            onClick={logIn}
          />
        ) : (
          <input
            className={`login__form_submit ${isButtonDisabled ? 'temp-disabled' : ''}`}
            type="submit"
            value="Sign up"
            disabled={!(name && login && password)}
            onClick={createUser}
          />
        )}
      </form>
      {isLogin ? (
        <p className="login__suggestion">
          Don&apos;t have an account?
          <NavLink className="login__link" to="/registration">
            <span className="reg-underline">Sign up!</span>
          </NavLink>
        </p>
      ) : (
        <p className="login__suggestion">
          Already with us?
          <NavLink className="login__link" to="/login">
            <span className="reg-underline">Sign in!</span>
          </NavLink>
        </p>
      )}
    </div>
  );
}

export default LoginPage;
