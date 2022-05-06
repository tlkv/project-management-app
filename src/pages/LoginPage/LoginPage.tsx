import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './LoginPage.scss';
import { API_URL } from '../../data/constants';
import { AppContext } from '../../App';
import AuthPopup from './AuthPopup/AuthPopup';

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
  };
  const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const createUser = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        login,
        password,
      }),
    };
    const response = await fetch(`${API_URL}/signup`, options);
    console.log(response);
    if (response.status === 201) {
      navigate('/login');
      return;
    }
    if (response.status === 409) {
      setPopupMessage('This login already exists');
      setIsPopupShown(true);
    }
  };
  const logIn = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        password,
      }),
    };
    const response = await fetch(`${API_URL}/signin`, options);
    if (response.status === 201) {
      const body = await response.json();
      context.setIsAuth(true);
      localStorage.setItem('token', body.token);
      localStorage.setItem('login', login);
      navigate('/');
      return;
    }
    if (response.status === 403) {
      setPopupMessage('Wrong login or password');
      setIsPopupShown(true);
    }
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
          {/* {this.state.isNameValid ? null : <div className="form__invalid-field">Invalid name</div>} */}
        </div>
        <div className="login__form-field login__form-field_text">
          <label htmlFor="password">
            Password
            <input
              className="login__form_input"
              type="text"
              placeholder="Enter your password"
              id="password"
              onInput={handlePasswordInput}
            />
          </label>
          {/* {this.state.isNameValid ? null : <div className="form__invalid-field">Invalid name</div>} */}
        </div>
        {isLogin ? (
          <input
            className="login__form_submit"
            type="submit"
            value="Sign in"
            disabled={isLoginValid && isPasswordValid && (!login || !password)}
            onClick={logIn}
          />
        ) : (
          <input
            className="login__form_submit"
            type="submit"
            value="Sign up"
            disabled={
              isLoginValid && isNameValid && isPasswordValid && (!name || !login || !password)
            }
            onClick={createUser}
          />
        )}
      </form>
      {isLogin ? (
        <p className="login__suggestion">
          Not with us? So&nbsp;
          <Link className="login__link" to="/registration">
            sign up!
          </Link>
        </p>
      ) : (
        <p className="login__suggestion">
          Already with us? So&nbsp;
          <Link className="login__link" to="/login">
            sign in!
          </Link>
        </p>
      )}
      {isPopupShown ? <AuthPopup message={popupMessage} setIsPopupShown={setIsPopupShown} /> : null}
    </div>
  );
}

export default LoginPage;
