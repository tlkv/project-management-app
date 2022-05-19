import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../App';
import dict from '../../data/dict';

function WelcomePage() {
  const { lang, isAuth } = useContext(AppContext);

  return (
    <div className="narrow-container">
      <h1 className="title">Welcome to Project Management App</h1>

      {!isAuth && (
        <div>
          <div>
            <NavLink to="/login">Sign In</NavLink>
          </div>
          <div>
            <NavLink to="/registration">Sign up</NavLink>
          </div>
        </div>
      )}

      {isAuth && (
        <div>
          <NavLink to="/">Go to Main Page</NavLink>
        </div>
      )}

      <p>{dict[lang].welcomePage.front}</p>
    </div>
  );
}

export default WelcomePage;
