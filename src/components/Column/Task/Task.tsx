/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import deleteTask from '../../../api/deleteTask';
import { AppContext } from '../../../App';
import { TaskResponse } from '../../../data/interfacesV';
import CardModal from '../../CardModal/CardModal';
import ModalConfirm from '../../ModalConfirm/ModalConfirm';

function Task({
  task,
  ind,
  boardId,
  columnId,
  loadBoard,
}: {
  task: TaskResponse;
  ind: number;
  boardId: string;
  columnId: string;
  loadBoard: () => Promise<void>;
}) {
  const { logoutUser } = useContext(AppContext);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isModalOpen, showModal] = useState(false);

  const onDelete = async () => {
    const res = await deleteTask(boardId, columnId, task.id, logoutUser);
    if (res) {
      await loadBoard();
    }
  };

  const handleDeletePreviewTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    showModal(true);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={ind + 1}>
        {(provTask, snapTask) => (
          <div
            className={`list__task ${snapTask.isDragging ? 'task-dragging' : ''}`}
            {...provTask.draggableProps}
            {...provTask.dragHandleProps}
            ref={provTask.innerRef}
            onClick={() => setIsCardOpen(true)}
          >
            {task.title}
            <button
              className="list__btn delete light-gr"
              type="button"
              onClick={handleDeletePreviewTask}
            >
              <i className="fa-regular fa-trash-can"> </i>
            </button>
          </div>
        )}
      </Draggable>
      {isCardOpen && (
        <CardModal
          task={task}
          boardId={boardId}
          columnId={columnId}
          setIsCardOpen={setIsCardOpen}
          loadBoard={loadBoard}
          showModal={showModal}
        />
      )}
      {isModalOpen && (
        <ModalConfirm
          showModal={showModal}
          message={<p>Are you sure?</p>}
          modalCallback={onDelete}
        />
      )}
    </>
  );
}

export default Task;
