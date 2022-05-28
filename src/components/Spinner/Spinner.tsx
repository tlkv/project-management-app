/* eslint-disable jsx-a11y/control-has-associated-label */

import { createPortal } from 'react-dom';
import './Spinner.scss';

export default function Spinner() {
  return createPortal(
    <div className="modal-spinner">
      <div id="spinner-bott-circle ">
        <svg
          id="loading-spinner"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle id="loading-circle" cx="20" cy="20" r="18" stroke="#005CB9" strokeWidth="4" />
        </svg>
      </div>
    </div>,
    document.getElementById('modal') as Element
  );
}
