import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
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
    if (window.pageYOffset <= 20) {
      setFixed(false);
    } else if (window.pageYOffset > 20) {
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
      <nav className="narrow-container">
        <ul className="nav-wrapper ">
          {isAuth && (
            <li className="nav-item">
              <button
                type="button"
                className="header-button"
                onClick={() => setIsCreateBoardOpen(true)}
              >
                New Board
              </button>
              {isCreateBoardOpen && <CreateBoardBar setIsCreateBoardOpen={setIsCreateBoardOpen} />}
            </li>
          )}
          {isAuth && (
            <li className="nav-item">
              <NavLink to="/" className="nav-inner">
                Go to Main Page
              </NavLink>
            </li>
          )}
          {isAuth && (
            <li className="nav-item">
              <NavLink to="/profile" className="nav-inner">
                Edit Profile
              </NavLink>
            </li>
          )}
          {isAuth && (
            <li className="nav-item">
              <NavLink to="/stats" className="nav-inner">
                Stats
              </NavLink>
            </li>
          )}
          {!isAuth && (
            <li className="nav-item">
              <NavLink to="/login" className="nav-inner">
                Sign In
              </NavLink>
            </li>
          )}
          {!isAuth && (
            <li className="nav-item">
              <NavLink to="/registration" className="nav-inner">
                Sign up
              </NavLink>
            </li>
          )}
          {isAuth && (
            <li className="nav-item">
              <button
                type="button"
                className="header-button"
                onClick={() => {
                  logoutUser();
                }}
              >
                Sign Out
              </button>
            </li>
          )}
          <li className="nav-item">
            <button
              type="button"
              className={
                lang === LANG_EN ? 'header-button lang-button' : 'header-button lang-button-red'
              }
              onClick={changeLang}
            >
              {lang}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
