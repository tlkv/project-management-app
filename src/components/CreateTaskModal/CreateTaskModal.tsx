/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
import { createRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import createTask from '../../api/createTask';
import './CreateTaskModal.scss';

function CreateTaskModal({
  columnId,
  boardId,
  order,
  loadBoard,
  setIsTaskCreateOpen,
}: {
  columnId: string;
  boardId: string;
  order: number;
  loadBoard: () => Promise<void>;
  setIsTaskCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const Container = document.getElementById('modal') as HTMLElement;
  const [isDisabled, setIsDisabled] = useState(false);
  const taskTitle = createRef<HTMLInputElement>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);

    if (taskTitle.current) {
      const res = await createTask(boardId, columnId, taskTitle.current.value, false, order, ' ');
      if (res) {
        loadBoard();
      }
    }

    setIsTaskCreateOpen(false);
    setIsDisabled(false);
  };

  useEffect(() => {
    if (taskTitle.current) {
      taskTitle.current.focus();
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsTaskCreateOpen(false);
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
      onClick={() => setIsTaskCreateOpen(false)}
    >
      <div className="create-board" role="presentation" onClick={(e) => e.stopPropagation()}>
        <h3>Add task</h3>
        <button
          className="create-board__close-btn"
          type="button"
          aria-label="toggle"
          onClick={() => setIsTaskCreateOpen(false)}
        ></button>
        <form onSubmit={handleSubmit}>
          <input
            className="board__add-list create-task-input"
            pattern="[a-zA-Z0-9 ]{2,140}"
            required
            ref={taskTitle}
            placeholder="title"
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

export default CreateTaskModal;
