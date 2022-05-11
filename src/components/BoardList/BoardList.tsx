import { useContext } from 'react';
import { AppContext } from '../../App';
import Board from '../Board/Board';
import './BoardList.scss';

function BoardList() {
  const { boards } = useContext(AppContext);
  const boardsArray =
    boards.length &&
    boards.map((board) => <Board key={board.id} id={board.id} title={board.title} />);

  return (
    <div className="board-list">
      {boardsArray || <h3 className="no-data">No boards available</h3>}
    </div>
  );
}

export default BoardList;
