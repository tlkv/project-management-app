import { useContext, useState } from 'react';
import deleteColumn from '../../api/deleteColumn';
import { AppContext } from '../../App';
import { TaskResponse } from '../../data/interfacesV';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';
import ColHeader from './ColHeader/ColHeader';

function Column({
  columnId,
  title,
  order,
  boardId,
  tasks,
  loadBoard,
}: {
  columnId: string;
  title: string;
  order: number;
  boardId: string;
  tasks: TaskResponse[];
  loadBoard: () => Promise<void>;
}) {
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
        <ColHeader
          columnId={columnId}
          boardId={boardId}
          title={title}
          order={order}
          onDelete={onDelete}
          loadBoard={loadBoard}
        />
        <div className="list__tasks">{tasksArray}</div>
        <div className="add-task-container">
          <button className="add-task" type="button" onClick={() => setIsTaskCreateOpen(true)}>
            <i className="fa-solid fa-plus"> </i>
            Add a task
          </button>
        </div>
      </div>
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
