/* eslint-disable react/jsx-props-no-spreading */
import { LegacyRef, useState, useContext } from 'react';
import {
  Draggable,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
  Droppable,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import deleteColumn from '../../api/deleteColumn';
import { AppContext } from '../../App';
import { TaskResponse } from '../../data/interfacesV';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import './Column.scss';

function Column({
  columnId,
  title,
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
  boardId: string;
  tasks: TaskResponse[];
  loadBoard: () => Promise<void>;
  drProps: DraggableProvidedDraggableProps;
  drHandleProps: DraggableProvidedDragHandleProps;
  innerRef: LegacyRef<HTMLDivElement> | undefined;
  isDragging: boolean;
}) {
  const [isModalOpen, showModal] = useState(false);
  const [isTaskCreateOpen, setIsTaskCreateOpen] = useState(false);
  const { logoutUser } = useContext(AppContext);

  /*   const tasksArray = tasks.map((task) => (
    <div key={task.id} className="list__task">
      {task.title}
    </div>
  )); */

  const onDelete = async () => {
    const res = await deleteColumn(boardId, columnId, logoutUser);
    if (res) {
      loadBoard();
    }
  };

  return (
    <div className="list-wrapper" ref={innerRef} {...drProps} {...drHandleProps}>
      <div className={`list ${isDragging ? 'list-dragging' : ''}`}>
        <div className="list__header">
          <h3 className="list__title">{title}</h3>
          <button className="list__delete-btn" type="button" onClick={() => showModal(true)}>
            <i className="fa-solid fa-xmark"> </i>
          </button>
        </div>
        <Droppable droppableId={`dr_${columnId}`} key={columnId} type="TASK">
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
