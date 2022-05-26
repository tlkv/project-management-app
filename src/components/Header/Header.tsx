/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../../App';
import { LANG_EN, LANG_RU } from '../../data/constants';
import './Header.scss';
import CreateBoardBar from '../CreateBoardBar/CreateBoardBar';

function Header() {
  const { lang, switchLang, isAuth, logoutUser } = useContext(AppContext);
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
  const [isFixed, setFixed] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);

  const changeLang = () => {
    if (lang === LANG_RU) {
      switchLang(LANG_EN);
      localStorage.setItem('pmapp34-lang', LANG_EN);
    } else if (lang === LANG_EN) {
      switchLang(LANG_RU);
      localStorage.setItem('pmapp34-lang', LANG_RU);
    }
  };

  const handleScroll = () => {
    if (window.pageYOffset <= 12) {
      setFixed(false);
    } else if (window.pageYOffset > 12) {
      setFixed(true);
    }
  };

  const toggleNavbar = () => {
    setNavOpen(!isNavOpen);
  };

  const closeNavbar = () => {
    setNavOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={!isFixed ? 'header' : 'header header-fixed'} id="header">
      <nav className="narrow-container header-menu-container">
        <Link to="/welcome" className="nav-inner nav-app-logo" onClick={closeNavbar}>
          RS Project Management App
        </Link>
        <div
          className={`nav-overlay ${isNavOpen ? 'show-nav-overlay' : ''} `}
          onClick={closeNavbar}
        >
          <ul
            className={`nav-wrapper ${isNavOpen ? 'nav-show' : ''} ${
              isFixed ? 'header-colored' : ''
            }`}
          >
            {isAuth && (
              <li className="nav-item">
                <button
                  type="button"
                  className="header-button nav-inner"
                  onClick={() => setIsCreateBoardOpen(true)}
                >
                  <span>
                    <i className="fa-solid fa-plus" />
                    New Board
                  </span>
                </button>
                {isCreateBoardOpen && (
                  <CreateBoardBar setIsCreateBoardOpen={setIsCreateBoardOpen} />
                )}
              </li>
            )}

            {isAuth && (
              <li className="nav-item">
                <NavLink to="/search" className="nav-inner">
                  <span>
                    <i className="fa-solid fa-magnifying-glass" />
                    Search
                  </span>
                </NavLink>
              </li>
            )}

            {isAuth && (
              <li className="nav-item">
                <NavLink to="/stats" className="nav-inner">
                  <span>
                    <i className="fa-solid fa-star" />
                    Stats
                  </span>
                </NavLink>
              </li>
            )}

            {isAuth && (
              <li className="nav-item">
                <NavLink to="/profile" className="nav-inner">
                  <span>
                    <i className="fa-solid fa-user" />
                    Edit Profile
                  </span>
                </NavLink>
              </li>
            )}

            {isAuth && (
              <li className="nav-item">
                <NavLink to="/" className="nav-inner">
                  <span>
                    <i className="fa-solid fa-clipboard-check" />
                    Main Page
                  </span>
                </NavLink>
              </li>
            )}

            {isAuth && (
              <li className="nav-item">
                <button
                  type="button"
                  className="header-button nav-inner"
                  onClick={() => {
                    logoutUser();
                  }}
                >
                  <span>
                    <i className="fa-solid fa-right-from-bracket" />
                    Sign Out
                  </span>
                </button>
              </li>
            )}

            {!isAuth && (
              <li className="nav-item">
                <NavLink to="/login" className="main-nav-btn main-nav-btn-dark">
                  <i className="fa-solid fa-user-lock" />
                  Sign In
                </NavLink>
              </li>
            )}

            {!isAuth && (
              <li className="nav-item">
                <NavLink to="/registration" className="main-nav-btn">
                  <i className="fa-solid fa-user-check" /> Sign up
                </NavLink>
              </li>
            )}

            <li className="nav-item">
              <button
                type="button"
                className={
                  lang === LANG_EN
                    ? 'header-button lang-button'
                    : 'header-button lang-button lang-button-red'
                }
                onClick={changeLang}
              >
                {lang}
              </button>
            </li>
          </ul>
        </div>
        <button className="header-burger" type="button" onClick={toggleNavbar}>
          <i className="fa-solid fa-bars" />
        </button>
      </nav>
    </header>
  );
}

export default Header;
