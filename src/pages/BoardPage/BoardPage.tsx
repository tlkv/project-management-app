/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { BoardResponse } from '../../data/interfacesV';
import getBoard from '../../api/getBoard';
import ColumnList from '../../components/ColumnList/ColumnList';
import './BoardPage.scss';

function BoardPage() {
  const { isAuth } = useContext(AppContext);
  const [board, setBoard] = useState<BoardResponse>({
    id: '',
    title: '',
    description: '',
    columns: [],
  });
  const navigate = useNavigate();
  const boardId = window.location.pathname.split('/board/').join('');

  const loadBoard = async () => {
    const data = await getBoard(boardId);
    if (data) {
      setBoard(data);
    } else {
      navigate('/');
    }
  };

  const reorderColumns = (sourceId: string, ordPrev: number, ordNext: number) => {
    const updColumns = [...board.columns];
    updColumns.forEach((item) => {
      if (item.order !== ordPrev) {
        if (item.order >= ordPrev && item.order <= ordNext) {
          item.order -= 1;
        } else if (item.order >= ordNext && item.order <= ordPrev) {
          item.order += 1;
        }
      } else {
        item.order = ordNext;
      }
    });
    setBoard({ ...board, columns: updColumns });
  };

  useEffect(() => {
    if (!isAuth && !localStorage.getItem('pmapp34-token')) {
      navigate('/welcome');
    } else {
      loadBoard();
    }
  }, [isAuth]);

  return (
    <div>
      <div className="board-header">
        <Link className="board-header__btn" to="/">
          <i className="fa-solid fa-angle-left"> </i> Back
        </Link>
        <div className="board-header-title-wrapper">
          <h1 className="board-header__title">{board.title}</h1>
          <span>-</span>
          <h3 className="board-header__title">{board.description}</h3>
        </div>
      </div>
      <div className="board">
        <ColumnList
          boardId={boardId}
          columns={board.columns}
          loadBoard={loadBoard}
          reorderColumns={reorderColumns}
        />
      </div>
    </div>
  );
}

export default BoardPage;
