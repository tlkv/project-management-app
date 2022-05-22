/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import './SearchPage.scss';
import { AppContext } from '../../App';
import getAllTasks from '../../api/getAllTasks';
import { TaskResponse } from '../../data/interfacesV';
import SearchTaskInfo from '../../components/SearchTaskInfo/SearchTaskInfo';

const mock: { name: string; id: string }[] = [
  {
    name: '1',
    id: '1',
  },
  {
    name: '2',
    id: '2',
  },
  {
    name: '3',
    id: '3',
  },
  {
    name: '4',
    id: '4',
  },
];

export default function SearchPage() {
  const { isAuth, logoutUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  const [characters, updateCharacters] = useState(mock);
  function handleOnDragEnd(results: DropResult) {
    if (!results.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(results.source.index, 1);
    items.splice(results.destination.index, 0, reorderedItem);
    updateCharacters(items);
  }

  useEffect(() => {
    if (!isAuth && !localStorage.getItem('pmapp34-token')) {
      navigate('/welcome');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await getAllTasks(logoutUser);
    setTasks(res);
  };

  return (
    <div className="narrow-container">
      <h1 className="title">Search tasks</h1>
      <div className="search-form-wrapper">
        <form onSubmit={handleSubmit} className="search-form">
          <input type="text" placeholder="keyword to find in task title or description" />
          <button type="submit">search</button>
        </form>
      </div>
      <div className="search-tasks-wrapper">
        {tasks.map((i) => (
          <SearchTaskInfo
            id={i.id}
            title={i.title}
            order={i.order}
            done={i.done}
            description={i.description}
            userId={i.userId}
            boardId={i.boardId}
            columnId={i.columnId}
            key={i.id}
          />
        ))}
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters" direction="horizontal">
          {(provided) => (
            <div className="drop-container" {...provided.droppableProps} ref={provided.innerRef}>
              {characters.map(({ name, id }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(providedColumn) => (
                      <div
                        className="drop-item"
                        {...providedColumn.draggableProps}
                        {...providedColumn.dragHandleProps}
                        ref={providedColumn.innerRef}
                      >
                        {name}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
