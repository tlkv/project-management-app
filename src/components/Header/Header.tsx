import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { LANG_EN, LANG_RU } from '../../data/constants';
import './Header.scss';
import logout from '../../api/logout';
import CreateBoardBar from '../CreateBoardBar/CreateBoardBar';

function Header() {
  const { lang, switchLang, setIsAuth, isAuth } = useContext(AppContext);
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
  const navigate = useNavigate();

  const changeLang = () => {
    if (lang === LANG_RU) {
      switchLang(LANG_EN);
    } else {
      switchLang(LANG_RU);
    }
  };

  return (
    <header className="header" id="header">
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
                  logout(setIsAuth);
                  navigate('/welcome');
                }}
              >
                Sign Out
              </button>
            </li>
          )}
          <li className="nav-item">
            <button type="button" className="header-button" onClick={changeLang}>
              {lang}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
