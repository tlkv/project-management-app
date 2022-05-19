import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../App';
import dict from '../../data/dict';
import './WelcomePage.scss';

function WelcomePage() {
  const { lang, isAuth } = useContext(AppContext);

  return (
    <div className="narrow-container">
      <h1 className="title">Welcome to Project Management App</h1>

      {!isAuth && (
        <div>
          <div>
            <NavLink to="/login" className="main-nav-btn">
              Sign In
            </NavLink>
          </div>
          <div>
            <NavLink to="/registration" className="main-nav-btn">
              Sign up
            </NavLink>
          </div>
        </div>
      )}

      {isAuth && (
        <div>
          <NavLink to="/" className="main-nav-btn">
            Go to Main Page
          </NavLink>
        </div>
      )}

      <p>{dict[lang].welcomePage.front}</p>
    </div>
  );
}

export default WelcomePage;
