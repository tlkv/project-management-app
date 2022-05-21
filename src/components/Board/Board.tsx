import { useContext } from 'react';
import { Link } from 'react-router-dom';
import deleteBoard from '../../api/deleteBoard';
import getBoards from '../../api/getBoards';
import { AppContext } from '../../App';
import { SET_BOARDS } from '../../data/constantsV';
import { BoardsResponse } from '../../data/interfaces';
import useConfirm from '../../utils/useConfirm';
import './Board.scss';

function Board({ id, title, description }: BoardsResponse) {
  const { dispatchBoards } = useContext(AppContext);
  const { isConfirmed } = useConfirm();

  const handleDeleteBoard = async () => {
    const confirmed = await isConfirmed(`You sure about that?`);
    if (confirmed) {
      await deleteBoard(id);
      const updatedBoards = await getBoards();
      if (updatedBoards) {
        dispatchBoards({ type: SET_BOARDS, payload: updatedBoards });
      }
    }
  };

  return (
    <div className="board-item">
      <Link className="board-item__link" to={`/board/${id}`} />
      <div className="board-item__info">
        <div className="board-item__title">{title}</div>
        <div className="board-item__title board-item__title-desc">{description}</div>
        <button type="button" className="board-item__delete-btn" onClick={handleDeleteBoard}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Board;
