import { AuthPopupData } from '../../../data/interfaces';
import './AuthPopup.scss';

export default function AuthPopup({ message, setIsPopupShown }: AuthPopupData) {
  const destroyPopup = () => {
    setIsPopupShown(false);
  };
  return (
    <div className="auth-popup">
      <div className="auth-popup__box">
        <h1 className="auth-popup__message">{message}</h1>
        <button type="button" className="auth-popup__btn" onClick={destroyPopup}>
          OK
        </button>
      </div>
    </div>
  );
}
