import { createPortal } from 'react-dom';
import { ModalConfirmation } from '../../data/interfacesA';

export default function ModalConfirm({ showModal, message }: ModalConfirmation) {
  return createPortal(
    <div>
      <h3>Confirmation Modal</h3>
      <p>{message}</p>
      <button type="button" onClick={() => showModal(false)}>
        Close modal
      </button>
    </div>,
    document.getElementById('modal') as Element
  );
}
