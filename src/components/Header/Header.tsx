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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={!isFixed ? 'header' : 'header header-fixed'} id="header">
      {isAuth && (
        <nav className="narrow-container header-menu-container">
          <Link to="/welcome" className="nav-inner nav-app-logo">
            Project Management App
          </Link>
          <ul className="nav-wrapper ">
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
              {isCreateBoardOpen && <CreateBoardBar setIsCreateBoardOpen={setIsCreateBoardOpen} />}
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-inner">
                <span>
                  <i className="fa-solid fa-clipboard-check" />
                  Boards
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/search" className="nav-inner">
                <span>
                  <i className="fa-solid fa-magnifying-glass" />
                  Search
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/stats" className="nav-inner">
                <span>
                  <i className="fa-solid fa-star" />
                  Stats
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profile" className="nav-inner">
                <span>
                  <i className="fa-solid fa-user" />
                  Edit Profile
                </span>
              </NavLink>
            </li>
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
          <button className="header-burger" type="button">
            <i className="fa-solid fa-bars" />
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
