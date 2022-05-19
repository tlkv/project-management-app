/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
import { createRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import createColumn from '../../api/createColumn';

function CreateColumnModal({
  boardId,
  order,
  loadBoard,
  setIsColCreateOpen,
}: {
  boardId: string;
  order: number;
  loadBoard: () => Promise<void>;
  setIsColCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const Container = document.getElementById('modal') as HTMLElement;
  const colName = createRef<HTMLInputElement>();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);

    if (colName.current) {
      const res = await createColumn(boardId, colName.current.value, order);
      if (res) {
        loadBoard();
      }
    }

    setIsColCreateOpen(false);
    setIsDisabled(false);
  };

  useEffect(() => {
    if (colName.current) {
      colName.current.focus();
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsColCreateOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  return ReactDOM.createPortal(
    <div
      className="modal-wrapper"
      role="button"
      tabIndex={0}
      onClick={() => setIsColCreateOpen(false)}
    >
      <div className="create-board" role="presentation" onClick={(e) => e.stopPropagation()}>
        <h3>Add list</h3>
        <button
          className="create-board__close-btn"
          type="button"
          aria-label="toggle"
          onClick={() => setIsColCreateOpen(false)}
        ></button>
        <form onSubmit={handleSubmit}>
          <input
            className="board__add-list create-task-input"
            pattern="[a-zA-Z0-9 ]{2,14}"
            required
            ref={colName}
          />
          <button className="create-board__create-btn" type="submit" disabled={isDisabled}>
            Add
          </button>
        </form>
      </div>
    </div>,
    Container
  );
}

export default CreateColumnModal;
