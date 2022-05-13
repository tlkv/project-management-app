import { useContext } from 'react';
import { AppContext } from '../../App';
import dict from '../../data/dict';

function WelcomePage() {
  const { lang } = useContext(AppContext);
  return (
    <div className="narrow-container">
      <h1 className="title">Welcome Route</h1>
      <p>{dict[lang].welcomePage.front}</p>
    </div>
  );
}

export default WelcomePage;
