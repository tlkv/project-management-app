/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { createRef, Dispatch, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { AppContext } from '../../App';
import { TaskResponse } from '../../data/interfacesV';
import updateTask from '../../api/updateTask';
import getAllUsers from '../../api/getAllUsers';
import './CardModal.scss';
import getUser from '../../api/getUser';
import { ApiUserInfo } from '../../data/interfacesA';

function CardModal({
  task,
  boardId,
  columnId,
  loadBoard,
  setIsCardOpen,
  showModal,
}: {
  task: TaskResponse;
  boardId: string;
  columnId: string;
  loadBoard: () => Promise<void>;
  setIsCardOpen: Dispatch<React.SetStateAction<boolean>>;
  showModal: Dispatch<React.SetStateAction<boolean>>;
}) {
  const Container = document.getElementById('modal') as HTMLElement;
  const { logoutUser } = useContext(AppContext);
  const [responsible, setResponsible] = useState('');
  const [users, setUsers] = useState<ApiUserInfo[]>([]);
  const [selected, setSelected] = useState('');
  const [isTitleInputShow, setIsTitleInputShow] = useState(false);
  const [isDescInputShow, setIsDescInputShow] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDesc, setTaskDesc] = useState(task.description);
  const [historyDesc, setHistoryDesc] = useState(task.description);
  const textTitle = createRef<HTMLTextAreaElement>();
  const textDesc = createRef<HTMLTextAreaElement>();

  const getUserLoginAndSetResponsible = async (id: string) => {
    if (id) {
      const res = await getUser(id, logoutUser);
      if (res) {
        setResponsible(res.login);
      }
    }
  };

  const hideCardAndShowDeleteModal = () => {
    showModal(true);
    setIsCardOpen(false);
  };

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userID = e.target.value;
    setSelected(e.target.value);
    await getUserLoginAndSetResponsible(userID);
    await updateTask(
      boardId,
      columnId,
      task.id,
      taskTitle,
      task.order,
      taskDesc,
      userID,
      boardId,
      columnId,
      logoutUser
    );
  };

  const cancelDescChange = () => {
    setTaskDesc(historyDesc);
    setIsDescInputShow(false);
  };

  const acceptDescChange = () => {
    const removedSpacesFromDesc = taskDesc.replace(/\s+/g, ' ').trim();
    if (!removedSpacesFromDesc) {
      setTaskDesc(' ');
      setHistoryDesc(' ');
    } else {
      setHistoryDesc(taskDesc);
    }
    setIsDescInputShow(false);
  };

  const saveCard = async () => {
    if (isDescInputShow) {
      cancelDescChange();
      return;
    }

    if (
      task.title !== taskTitle ||
      task.description !== taskDesc ||
      (task.userId !== selected && selected)
    ) {
      const res = await updateTask(
        boardId,
        columnId,
        task.id,
        taskTitle || ' ',
        task.order,
        taskDesc,
        selected || task.userId,
        boardId,
        columnId,
        logoutUser
      );

      if (res) {
        await loadBoard();
      }
    }

    setIsCardOpen(false);
  };

  useEffect(() => {
    const getUsers = async () => {
      const res = await getAllUsers(logoutUser);
      if (res) {
        setUsers(res);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    getUserLoginAndSetResponsible(task.userId);
  }, [setIsCardOpen]);

  useEffect(() => {
    if (textTitle.current) textTitle.current.focus();
    if (textDesc.current) textDesc.current.focus();
  }, [isTitleInputShow, isDescInputShow]);

  return ReactDOM.createPortal(
    <div
      style={{ padding: '40px 0' }}
      className="modal-wrapper"
      role="button"
      tabIndex={0}
      onMouseDown={() => saveCard()}
    >
      <div className="card-modal" role="presentation" onMouseDown={(e) => e.stopPropagation()}>
        <button
          className="card__close"
          type="button"
          aria-label="toggle"
          onClick={() => saveCard()}
        >
          <i className="fa-solid fa-xmark"> </i>
        </button>
        <div className="card-modal__container">
          <i className="user fa-solid fa-chalkboard-user"> </i>
          <p className="task__subtitle">
            Responsible [<span className="responsible-name">{responsible}</span>]
          </p>
        </div>
        <div className="card-modal__container">
          <i className="fa-brands fa-hive"> </i>
          {isTitleInputShow ? (
            <textarea
              className="task__title task__textarea"
              value={taskTitle}
              ref={textTitle}
              onBlur={() => setIsTitleInputShow(false)}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          ) : (
            <h3 className="task__title" onClick={() => setIsTitleInputShow(true)}>
              {taskTitle || ' '}
            </h3>
          )}
        </div>
        <div className="card-modal__container">
          <i className="fa-solid fa-align-left"> </i>
          <div>
            <h4 className="task__subtitle">Description</h4>
            {isDescInputShow ? (
              <div className="task-desc-container">
                <textarea
                  className="task__desc task__textarea"
                  value={taskDesc}
                  ref={textDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                />
                <button
                  className="task__btn accept"
                  type="submit"
                  onClick={() => acceptDescChange()}
                >
                  <i className="fa-solid fa-check"> </i>
                </button>
                <button className="task__btn" type="button" onClick={cancelDescChange}>
                  <i className="fa-solid fa-xmark"> </i>
                </button>
              </div>
            ) : (
              <p className="task__desc" onClick={() => setIsDescInputShow(true)}>
                {taskDesc === ' ' ? (
                  <span className="add-desc">
                    <i className="fa-solid fa-plus"> </i> Add description
                  </span>
                ) : (
                  taskDesc
                )}
              </p>
            )}
          </div>
        </div>

        <div className="task__buttons">
          <select className="card-modal__select" value={selected} onChange={handleSelectChange}>
            <option value="" disabled>
              Change responsible
            </option>
            {users.length &&
              users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.login}
                </option>
              ))}
          </select>
          <button className="task__delete" type="button" onClick={hideCardAndShowDeleteModal}>
            <i className="fa-regular fa-trash-can"> </i> Delete
          </button>
        </div>
      </div>
    </div>,
    Container
  );
}

export default CardModal;
