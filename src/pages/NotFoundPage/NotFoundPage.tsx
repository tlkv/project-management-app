import { useContext } from 'react';
import { AppContext } from '../../App';
import dict from '../../data/dict';
import './NotFoundPage.scss';

function NotFoundPage() {
  const { lang } = useContext(AppContext);
  return (
    <div className="narrow-container">
      <h1 className="title">404</h1>
      <p className="not-found-text">{dict[lang].notFoundPage.notFoundMessage}</p>
    </div>
  );
}

export default NotFoundPage;
