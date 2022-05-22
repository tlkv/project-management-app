import { useContext, useState } from 'react';
import deleteColumn from '../../api/deleteColumn';
import { AppContext } from '../../App';
import { TaskResponse } from '../../data/interfacesV';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';
import ModalConfirm from '../ModalConfirm/ModalConfirm';

function Column({
  columnId,
  title,
  boardId,
  tasks,
  loadBoard,
}: {
  columnId: string;
  title: string;
  boardId: string;
  tasks: TaskResponse[];
  loadBoard: () => Promise<void>;
}) {
  const [isModalOpen, showModal] = useState(false);
  const [isTaskCreateOpen, setIsTaskCreateOpen] = useState(false);
  const { logoutUser } = useContext(AppContext);

  const tasksArray = tasks.map((task) => (
    <div key={task.id} className="list__task">
      {task.title}
    </div>
  ));

  const onDelete = async () => {
    const res = await deleteColumn(boardId, columnId, logoutUser);
    if (res) {
      loadBoard();
    }
  };

  return (
    <div className="list-wrapper">
      <div className="list">
        <div className="list__header">
          <h3 className="list__title">{title}</h3>
          <button className="list__delete-btn" type="button" onClick={() => showModal(true)}>
            <i className="fa-solid fa-xmark"> </i>
          </button>
        </div>
        <div className="list__tasks">{tasksArray}</div>
        <div className="add-task-container">
          <button className="add-task" type="button" onClick={() => setIsTaskCreateOpen(true)}>
            <i className="fa-solid fa-plus"> </i>
            Add a task
          </button>
        </div>
      </div>
      {isModalOpen && (
        <ModalConfirm
          showModal={showModal}
          message={<p>Are you sure? Column will be deleted along with all tasks.</p>}
          modalCallback={onDelete}
        />
      )}
      {isTaskCreateOpen && (
        <CreateTaskModal
          columnId={columnId}
          boardId={boardId}
          loadBoard={loadBoard}
          setIsTaskCreateOpen={setIsTaskCreateOpen}
        />
      )}
    </div>
  );
}

export default Column;
