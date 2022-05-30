import { useContext, useState } from 'react';
import deleteTask from '../../api/deleteTask';
import validateUser from '../../api/_validateUser';
import { AppContext } from '../../App';

import { SearchTaskCard } from '../../data/interfaces';
import { toastWarnDark } from '../../utils/toast';
import CardModal from '../CardModal/CardModal';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import './SearchTaskInfo.scss';

export default function SearchTaskInfo({
  id,
  order,
  userId,
  boardId,
  columnId,
  title,
  description,
  loadTasks,
}: SearchTaskCard) {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isModalOpen, showModal] = useState(false);
  const { logoutUser, setSpinner } = useContext(AppContext);
  const handleShowCard = () => {
    setIsCardOpen(true);
  };

  const onDelete = async () => {
    const userData = await validateUser(logoutUser, setSpinner);
    if (userData) {
      if (userData.id === userId) {
        await deleteTask(boardId, columnId, id, logoutUser, setSpinner);
        await loadTasks();
      } else {
        toastWarnDark('You can not remove task, assigned to other user');
      }
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
          message={<p>Are you sure? Task will be removed</p>}
          modalCallback={onDelete}
        />
      )}
    </>
  );
}
