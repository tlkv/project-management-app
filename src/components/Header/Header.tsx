import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { LANG_EN, LANG_RU } from '../../data/constants';
import ROUTES_LIST from '../../utils/router';
import './Header.scss';

function Header() {
  const { lang, switchLang, setIsAuth } = useContext(AppContext);
  const navigate = useNavigate();

  const changeLang = () => {
    if (lang === LANG_RU) {
      switchLang(LANG_EN);
    } else {
      switchLang(LANG_RU);
    }
  };

  const navigateLogin = () => {
    navigate('/login');
  };

  const navigateProfile = () => {
    navigate('/profile');
  };

  const logout = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  return (
    <header className="header" id="header">
      <nav className="narrow-container">
        <ul className="nav-wrapper ">
          {ROUTES_LIST.map(
            (i) =>
              i.onNavbar && (
                <li className="nav-item" key={i.path}>
                  <NavLink to={i.path} className="nav-inner">
                    {i.navbarText}
                  </NavLink>
                </li>
              )
          )}
          <li className="nav-item">
            <button type="button" className="header-button">
              New Board
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="header-button" onClick={navigateProfile}>
              Edit Profile
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="header-button" onClick={changeLang}>
              {lang}
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="header-button" onClick={navigateLogin}>
              Login
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="header-button" onClick={navigateLogin}>
              Sign Up
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="header-button" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
