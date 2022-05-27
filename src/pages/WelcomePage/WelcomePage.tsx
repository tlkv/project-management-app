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
            <h2 className="main-title-heading">A flexible tool for teams to organize their work</h2>
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
          <div className="advantages-descr">
            <div className="front-icon-large">
              <i className="fa-solid fa-people-group" />
            </div>
            <h2>Build the workflow you want</h2>
            <p>Manage your boards using Drag-n-Drop</p>
          </div>
          <div className="advantages-video">
            <video autoPlay playsInline loop muted className="video-el">
              <source src="./assets/video/app1.mp4" type="video/mp4" className="jsx-video" />
            </video>
          </div>
        </div>
        <div className="front-content-wrapper">
          <div className="advantages-video">
            <video autoPlay playsInline loop muted className="video-el">
              <source src="./assets/video/app2.mp4" type="video/mp4" className="jsx-video" />
            </video>
          </div>
          <div className="advantages-descr reorder-desc">
            <div className="front-icon-large">
              <i className="fa-solid fa-list-check" />
            </div>
            <h2>Tasks contain everything you need</h2>
            <p>You can specify additional info in task description and assign users</p>
          </div>
        </div>
        <div className="front-content-wrapper">
          <div className="advantages-descr">
            <div className="front-icon-large">
              <i className="fa-solid fa-clipboard-list" />
            </div>
            <h2>Unlimited kanban boards, columns and tasks</h2>
            <p>No limits for all registered users</p>
          </div>
          <div className="advantages-video">
            <video autoPlay playsInline loop muted className="video-el">
              <source src="./assets/video/app3.mp4" type="video/mp4" className="jsx-video" />
            </video>
          </div>
        </div>
      </section>

      <section className="front-sec-three">
        <div className="front-content-wrapper"></div>
      </section>
      <section className="front-sec-four">
        <div className="front-content-wrapper">
          <h2 className="front-sec-title">Our team</h2>
          <div className="team-wrapper">
            <div className="pers-card-wrapper">
              <h3 className="pers-card-name">Andrey</h3>
              <div className="pers-card-photo pers-photo-1"></div>
              <div className="pers-card-details">
                <p className="pers-card-done">
                  <ul>
                    <li>1</li>
                    <li>2</li>
                  </ul>
                </p>
              </div>
            </div>
            <div className="pers-card-wrapper">
              <h3 className="pers-card-name">Vitali</h3>
              <div className="pers-card-photo pers-photo-2"></div>
              <div className="pers-card-details">
                <p className="pers-card-done"></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
