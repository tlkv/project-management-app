/* eslint-disable jsx-a11y/control-has-associated-label */
import { MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { ModalConfirmation } from '../../data/interfacesA';
import './ModalConfirm.scss';

export default function ModalConfirm({ modalCallback, showModal, message }: ModalConfirmation) {
  return createPortal(
    <div
      className="modal-overlay"
      onClick={() => showModal(false)}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      <div
        className="modal-content"
        onKeyDown={() => {}}
        role="button"
        onClick={(e: MouseEvent) => e.stopPropagation()}
        tabIndex={0}
      >
        <div className="modal-header">
          {message}
          <button
            className="modal-cross"
            type="button"
            aria-label="toggle"
            onClick={() => showModal(false)}
          />
        </div>
        <div className="modal-buttons-container">
          <button
            className="cancel-button modal-button"
            type="button"
            onClick={() => showModal(false)}
          >
            Cancel
          </button>
          <button className="ok-button modal-button" type="button" onClick={modalCallback}>
            OK
          </button>
        </div>
      </div>
    </div>,

    document.getElementById('modal') as Element
  );
}