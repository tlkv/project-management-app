/* eslint-disable react/self-closing-comp */
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../App';
import dict from '../../data/dict';
import './WelcomePage.scss';

function WelcomePage() {
  const { lang, isAuth } = useContext(AppContext);

  return (
    <main className="welcome">
      {/* <div className="narrow-container">
        <h1 className="title">Welcome to Project Management App</h1>
        <p>{dict[lang].welcomePage.front}</p>
      </div> */}
      <section className="welcome__start">
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
        <div className="welcome__start-left">
          <h1 className="welcome__start-title">Organize projects. Get more done</h1>
          <NavLink to="/login" className="welcome__start-button">
            get started
          </NavLink>
        </div>
        <div className="welcome__start-right">
          <img
            src="./assets/img/welcome-start-img.png"
            alt="phone"
            className="welcome__start-img"
          />
        </div>
      </section>
      <section className="welcome__clients">
        <div className="welcome__clients-wrapper">
          <img className="welcome__clients-logo" src="./assets/img/airbnb.png" alt="airbnb" />
          <img className="welcome__clients-logo" src="./assets/img/hubspot.png" alt="hubspot" />
          <img className="welcome__clients-logo" src="./assets/img/google.png" alt="google" />
          <img className="welcome__clients-logo" src="./assets/img/microsoft.png" alt="microsoft" />
          <img className="welcome__clients-logo" src="./assets/img/walmart.png" alt="walmart" />
          <img className="welcome__clients-logo" src="./assets/img/fedex.png" alt="fedex" />
        </div>
      </section>
      <section className="welcome__features">
        <h2 className="welcome__features-header">Tailor-made features</h2>
        <div className="welcome__features-grid">
          <div className="welcome__features-item">
            <div className="welcome__features-icon welcome__features-icon_1" />
            <h3 className="welcome__features-title">Constantly updated</h3>
            <p className="welcome__features-description">
              App will be constantly updated with new unique blocks and styles.
            </p>
          </div>
          <div className="welcome__features-item">
            <div className="welcome__features-icon welcome__features-icon_2" />
            <h3 className="welcome__features-title">Trust in scalable software</h3>
            <p className="welcome__features-description">
              Set up your teams for success and instill best practices across your entire
              organization.
            </p>
          </div>
          <div className="welcome__features-item">
            <div className="welcome__features-icon welcome__features-icon_3" />
            <h3 className="welcome__features-title">Dashboards</h3>
            <p className="welcome__features-description">
              Simplify decision making with real-time insights
            </p>
          </div>
          <div className="welcome__features-item">
            <div className="welcome__features-icon welcome__features-icon_4" />
            <h3 className="welcome__features-title">Integrations</h3>
            <p className="welcome__features-description">
              Keep your business tools all in one place
            </p>
          </div>
          <div className="welcome__features-item">
            <div className="welcome__features-icon welcome__features-icon_5" />
            <h3 className="welcome__features-title">Automation</h3>
            <p className="welcome__features-description">
              Save time and leave repetitive work behind
            </p>
          </div>
          <div className="welcome__features-item">
            <div className="welcome__features-icon welcome__features-icon_5" />
            <h3 className="welcome__features-title">Boards</h3>
            <p className="welcome__features-description">
              See and track your work on Kanban boards
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default WelcomePage;
