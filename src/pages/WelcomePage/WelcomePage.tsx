/* eslint-disable react/self-closing-comp */
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../App';
import dict from '../../data/dict';
import './WelcomePage.scss';

function WelcomePage() {
  const { lang, isAuth } = useContext(AppContext);

  return (
    <div className="front-wrapper">
      <section className="front-sec-one">
        <div className="front-content-wrapper">
          <div className="sec-one-left">
            <h2 className="main-title-heading">A flexible tool for teams to innovate their way</h2>
            <p className="front-content-paragraph">
              Collaborate, manage projects, and reach new productivity peaks. From high rises to the
              home office, the way your team works is unique — accomplish it all with RS Project
              Management App.
            </p>
            <div className="buttons-head-top">
              {isAuth && (
                <NavLink to="/" className="main-nav-btn">
                  <i className="fa-solid fa-circle-arrow-left" />
                  Main Page
                </NavLink>
              )}
              {!isAuth && (
                <>
                  <NavLink to="/login" className="main-nav-btn main-nav-btn-dark">
                    <i className="fa-solid fa-user-lock" />
                    Sign In
                  </NavLink>
                  <NavLink to="/registration" className="main-nav-btn">
                    <i className="fa-solid fa-user-check" /> Sign up
                  </NavLink>
                </>
              )}
            </div>
          </div>
          <div className="sec-one-right"></div>
        </div>
      </section>
      <section className="front-sec-two">
        <div className="front-content-wrapper">
          <h2 className="front-sec-title">Advantages (4 cards grid)</h2>
        </div>
      </section>
      <section className="front-sec-three">
        <div className="front-content-wrapper">
          <h2 className="front-sec-title">Parallax or scheme like asana.com</h2>
          <img src="./assets/img/asana.png" alt="sheme"></img>
        </div>
      </section>
      <section className="front-sec-four">
        <div className="front-content-wrapper">
          <h2 className="front-sec-title">About team</h2>
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
