import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchPage.scss';
import { AppContext } from '../../App';
import getAllTasks from '../../api/getAllTasks';
import { SearchTaskResponse } from '../../data/interfacesV';
import SearchTaskInfo from '../../components/SearchTaskInfo/SearchTaskInfo';

export default function SearchPage() {
  const { isAuth, logoutUser, setSpinner } = useContext(AppContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<SearchTaskResponse[]>([]);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    if (!isAuth && !localStorage.getItem('pmapp34-token')) {
      navigate('/welcome');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const loadTasks = async () => {
    if (searchVal.length !== 0) {
      const res = await getAllTasks(logoutUser, setSpinner);
      const searchValue = searchVal.toLocaleLowerCase();
      const filtered = res.filter(
        (i) =>
          i.title.toLocaleLowerCase().includes(searchValue) ||
          i.description.toLocaleLowerCase().includes(searchValue)
      );
      setTasks(filtered);
    } else {
      setTasks([]);
    }
  };

  const handleChange = (e: React.FormEvent) => {
    setSearchVal((e.target as HTMLInputElement).value);
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
          <input
            type="text"
            placeholder="search in task titles or descriptions"
            className="search-res-query"
            value={searchVal}
            onChange={handleChange}
          />
          <button type="submit" className="search-res-button">
            search
          </button>
        </form>
      </div>
      <div className="search-tasks-wrapper">
        {tasks.length === 0 && <h3>Nothing found yet. Another attempt?</h3>}
        {tasks.length !== 0 && <h3>Tasks found: {tasks.length}</h3>}
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
