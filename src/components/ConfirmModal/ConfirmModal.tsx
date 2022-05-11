import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import useConfirm from '../../utils/useConfirm';
import './ConfirmModal.scss';

export default function ConfirmModal() {
  const { isOpen, question, proceed, cancel } = useConfirm();
  const Container = document.getElementById('modal') as HTMLElement;
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (cancel && isOpen && e.key === 'Escape') {
        cancel();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [cancel, isOpen]);

  return ReactDOM.createPortal(
    <div className="modal-wrapper">
      <div className="confirm-modal">
        <p>{question}</p>

        <button className="confirm-modal__btn" onClick={() => proceed && proceed()} type="button">
          OK
        </button>
        <button className="confirm-modal__btn" onClick={() => cancel && cancel()} type="button">
          Cancel
        </button>
      </div>
    </div>,
    Container
  );
}
