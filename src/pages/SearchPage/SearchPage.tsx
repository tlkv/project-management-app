import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchPage.scss';
import { AppContext } from '../../App';
import getAllTasks from '../../api/getAllTasks';
import { TaskResponse } from '../../data/interfacesV';
import SearchTaskInfo from '../../components/SearchTaskInfo/SearchTaskInfo';

export default function SearchPage() {
  const { isAuth, logoutUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskResponse[]>([]);

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
    </div>
  );
}
