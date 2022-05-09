import { createPortal } from 'react-dom';
import { ModalConfirmation } from '../../data/interfacesA';

export default function ModalConfirm({ toggleModal, message }: ModalConfirmation) {
  return createPortal(
    <div>
      <h3>123</h3>
      <p>{message}</p>
      <button type="button" onClick={toggleModal}>
        test
      </button>
    </div>,
    document.getElementById('modal') as Element
  );
}
