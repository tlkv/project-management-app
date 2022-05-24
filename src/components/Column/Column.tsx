/* eslint-disable react/jsx-props-no-spreading */
import { LegacyRef, useState, useContext } from 'react';
import {
  Draggable,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
  Droppable,
} from 'react-beautiful-dnd';
import deleteColumn from '../../api/deleteColumn';
import { AppContext } from '../../App';
import { TaskResponse } from '../../data/interfacesV';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';
import ColHeader from './ColHeader/ColHeader';
import './Column.scss';

function Column({
  columnId,
  title,
  order,
  boardId,
  tasks,
  loadBoard,
  innerRef,
  drProps,
  drHandleProps,
  isDragging,
}: {
  columnId: string;
  title: string;
  order: number;
  boardId: string;
  tasks: TaskResponse[];
  loadBoard: () => Promise<void>;
  drProps: DraggableProvidedDraggableProps;
  drHandleProps: DraggableProvidedDragHandleProps;
  innerRef: LegacyRef<HTMLDivElement> | undefined;
  isDragging: boolean;
}) {
  const [isTaskCreateOpen, setIsTaskCreateOpen] = useState(false);
  const { logoutUser } = useContext(AppContext);

  const onDelete = async () => {
    const res = await deleteColumn(boardId, columnId, logoutUser);
    if (res) {
      loadBoard();
    }
  };

  return (
    <div className="list-wrapper" ref={innerRef} {...drProps} {...drHandleProps}>
      <div className={`list ${isDragging ? 'list-dragging' : ''}`}>
        <ColHeader
          columnId={columnId}
          boardId={boardId}
          title={title}
          order={order}
          onDelete={onDelete}
          loadBoard={loadBoard}
        />
        <Droppable droppableId={columnId} key={columnId} type="TASK">
          {(providedTasks, snapTasks) => (
            <div
              className={`list__tasks ${snapTasks.isDraggingOver ? 'list-dragged-on' : ''}`}
              {...providedTasks.droppableProps}
              ref={providedTasks.innerRef}
            >
              {tasks.map((task, ind) => {
                return (
                  <Draggable key={task.id} draggableId={task.id} index={ind + 1}>
                    {(provTask, snapTask) => (
                      <div
                        className={`list__task ${snapTask.isDragging ? 'task-dragging' : ''}`}
                        {...provTask.draggableProps}
                        {...provTask.dragHandleProps}
                        ref={provTask.innerRef}
                      >
                        {task.title}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {providedTasks.placeholder}
            </div>
          )}
        </Droppable>
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
