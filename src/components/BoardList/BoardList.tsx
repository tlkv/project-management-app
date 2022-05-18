import { useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import { SET_BOARDS } from '../../data/constantsV';
import getBoards from '../../api/getBoards';
import Board from '../Board/Board';
import './BoardList.scss';

function BoardList() {
  const { boards, dispatchBoards } = useContext(AppContext);
  const loadBoards = async () => {
    const data = await getBoards();
    if (data) {
      dispatchBoards({ type: SET_BOARDS, payload: data });
    }
  };

  useEffect(() => {
    if (!boards.length) {
      loadBoards();
    }
  }, []);

  const boardsArray =
    boards.length &&
    boards.map((board) => (
      <Board key={board.id} id={board.id} title={board.title} description={board.description} />
    ));

  return (
    <div className="board-list">
      {boardsArray || <h3 className="no-data">No boards available</h3>}
    </div>
  );
}

export default BoardList;
