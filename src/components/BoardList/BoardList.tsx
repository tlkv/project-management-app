/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { SET_BOARDS } from '../../data/constantsV';
import getBoards from '../../api/getBoards';
import Board from '../Board/Board';
import './BoardList.scss';

function BoardList() {
  const { isAuth, boards, dispatchBoards } = useContext(AppContext);
  const navigate = useNavigate();

  const loadBoards = async () => {
    const data = await getBoards();
    if (data) {
      dispatchBoards({ type: SET_BOARDS, payload: data });
    }
  };

  useEffect(() => {
    if (!isAuth && !localStorage.getItem('pmapp34-token')) {
      navigate('/welcome');
    } else if (!boards.length) {
      loadBoards();
    }
  }, [isAuth]);

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
