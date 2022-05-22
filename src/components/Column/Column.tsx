/* eslint-disable react/jsx-props-no-spreading */
import { LegacyRef, useState } from 'react';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { TaskResponse } from '../../data/interfacesV';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';

function Column({
  columnId,
  title,
  boardId,
  tasks,
  handleDelete,
  loadBoard,
  innerRef,
  drProps,
  drHandleProps,
}: {
  columnId: string;
  title: string;
  boardId: string;
  tasks: TaskResponse[];
  handleDelete: () => void;
  loadBoard: () => Promise<void>;
  drProps: DraggableProvidedDraggableProps;
  drHandleProps: DraggableProvidedDragHandleProps;
  innerRef: LegacyRef<HTMLDivElement> | undefined;
}) {
  const [isTaskCreateOpen, setIsTaskCreateOpen] = useState(false);
  const newTaskOrder = tasks.length ? [...tasks].sort((a, b) => b.order - a.order)[0].order + 1 : 1;

  const tasksArray = tasks.map((task) => (
    <div key={task.id} className="list__task">
      {task.done ? (
        <i className="fa-regular fa-square-check"> </i>
      ) : (
        <i className="fa-regular fa-square"> </i>
      )}
      <span style={{ marginLeft: '5px' }}>{task.title}</span>
    </div>
  ));

  return (
    <div className="list-wrapper" ref={innerRef} {...drProps} {...drHandleProps}>
      <div className="list">
        <div className="list__header">
          <h3 className="list__title">{title}</h3>
          <button className="list__delete-btn" type="button" onClick={handleDelete}>
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
      {isTaskCreateOpen && (
        <CreateTaskModal
          columnId={columnId}
          boardId={boardId}
          order={newTaskOrder}
          loadBoard={loadBoard}
          setIsTaskCreateOpen={setIsTaskCreateOpen}
        />
      )}
    </div>
  );
}

export default Column;
