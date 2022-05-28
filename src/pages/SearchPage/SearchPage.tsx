import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchPage.scss';
import { AppContext } from '../../App';
import getAllTasks from '../../api/getAllTasks';
import { SearchTaskResponse } from '../../data/interfacesV';
import SearchTaskInfo from '../../components/SearchTaskInfo/SearchTaskInfo';

export default function SearchPage() {
  const { isAuth, logoutUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<SearchTaskResponse[]>([]);

  useEffect(() => {
    if (!isAuth && !localStorage.getItem('pmapp34-token')) {
      navigate('/welcome');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const loadTasks = async () => {
    const res = await getAllTasks(logoutUser);
    setTasks(res);
    /*  if (data) {
      setBoard(data);
    } else {
      navigate('/');
    } */
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadTasks();
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
            description={i.description}
            userId={i.userId}
            user={i.user}
            boardId={i.boardId}
            columnId={i.columnId}
            key={i.id}
            loadTasks={loadTasks}
          />
        ))}
      </div>
    </div>
  );
}
