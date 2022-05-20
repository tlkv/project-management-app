/* eslint-disable react/self-closing-comp */
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../App';
import dict from '../../data/dict';
import './WelcomePage.scss';

function WelcomePage() {
  const { lang, isAuth } = useContext(AppContext);

  return (
    <div className="narrow-container">
      <div className="welc-buttons-container">
        {!isAuth && (
          <div className="buttons-head-top">
            <NavLink to="/login" className="main-nav-btn main-nav-btn-dark">
              <i className="fa-solid fa-user-lock" />
              Sign In
            </NavLink>
            <NavLink to="/registration" className="main-nav-btn">
              <i className="fa-solid fa-user-check" /> Sign up
            </NavLink>
          </div>
        )}
        {isAuth && (
          <NavLink to="/" className="main-nav-btn">
            <i className="fa-solid fa-circle-arrow-left" />
            Main Page
          </NavLink>
        )}
      </div>
      <h1 className="title">Welcome to Project Management App</h1>
      <p>{dict[lang].welcomePage.front}</p>
    </div>
  );
}

export default WelcomePage;
