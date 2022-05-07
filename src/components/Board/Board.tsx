import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { deleteBoard } from '../../api/api';
import { AppContext } from '../../App';
import { SET_BOARDS } from '../../data/constants';
import { BoardsResponse } from '../../data/interfaces';
import './Board.scss';

function Board({ id, title }: BoardsResponse) {
  const { boards, dispatchBoards } = useContext(AppContext);

  const handleDeleteBoard = () => {
    const filtredBoards = boards.filter((board) => board.id !== id);
    dispatchBoards({ type: SET_BOARDS, payload: filtredBoards });
    deleteBoard(id);
  };

  return (
    <div className="board-item">
      <Link className="board-item__link" to={`/boards/${id}`} />
      <div className="board-item__info">
        <div className="board-item__title">{title}</div>
        <button type="button" className="board-item__delete-btn" onClick={handleDeleteBoard}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Board;
