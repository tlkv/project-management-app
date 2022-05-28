/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useState } from 'react';
import deleteTask from '../../api/deleteTask';
import { AppContext } from '../../App';

import { SearchTaskCard } from '../../data/interfacesV';
import CardModal from '../CardModal/CardModal';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import './SearchTaskInfo.scss';

/*  {isCardOpen && (
        <CardModal
          task={{i.}}
          boardId={boardId}
          columnId={columnId}
          setIsCardOpen={setIsCardOpen}
          loadBoard={loadBoard}
          showModal={showModal}
        />
      )} */

export default function SearchTaskInfo({
  id,
  order,
  userId,
  user,
  boardId,
  columnId,
  title,
  description,
  loadTasks,
}: SearchTaskCard) {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isModalOpen, showModal] = useState(false);
  const { logoutUser } = useContext(AppContext);
  const handleShowCard = () => {
    setIsCardOpen(true);
  };

  const onDelete = async () => {
    const res = await deleteTask(boardId, columnId, id, logoutUser);
    if (res) {
      await loadTasks();
    }
  };

  return (
    <>
      <div className="search-task-info" onClick={handleShowCard}>
        <div className="search-task-field search-task-name">{title}</div>
        <div className="search-task-field  search-task-descr">{description}</div>
      </div>
      {isCardOpen && (
        <CardModal
          task={{ id, title, order, description, userId, boardId, columnId }}
          boardId={boardId}
          columnId={columnId}
          setIsCardOpen={setIsCardOpen}
          loadBoard={loadTasks}
          showModal={showModal}
        />
      )}
      {isModalOpen && (
        <ModalConfirm
          showModal={showModal}
          message={<p>Are you sure?</p>}
          modalCallback={onDelete}
        />
      )}
    </>
  );
}
