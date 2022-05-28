/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { BoardResponse, TaskResponse } from '../../data/interfacesV';
import getBoard from '../../api/getBoard';
import ColumnList from '../../components/ColumnList/ColumnList';
import './BoardPage.scss';
import updateColumn from '../../api/updateColumn';
import updateTask from '../../api/updateTask';

function BoardPage() {
  const { logoutUser, isAuth } = useContext(AppContext);
  const [board, setBoard] = useState<BoardResponse>({
    id: '',
    title: '',
    description: '',
    columns: [],
  });
  const navigate = useNavigate();
  const boardId = window.location.pathname.split('/board/').join('');

  const loadBoard = async () => {
    const data = await getBoard(boardId, logoutUser);
    if (data) {
      setBoard(data);
    } else {
      navigate('/');
    }
  };

  const reorderColumns = async (columnId: string, ordPrev: number, ordNext: number) => {
    const currColumn = board.columns.find((i) => i.id === columnId);
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
    await updateColumn(boardId, columnId, ordNext, logoutUser, currColumn?.title);
    loadBoard();
  };

  const reorderTasks = async (
    taskId: string,
    sourceId: string,
    destId: string,
    ordPrev: number,
    ordNext: number
  ) => {
    const currTask = board.columns
      .find((i) => i.id === sourceId)
      ?.tasks.find((item) => item.id === taskId);
    if (ordNext === 0) {
      ordNext += 1;
    }

    const updColumns = [...board.columns];
    const sourceIndex = updColumns.findIndex((i) => i.id === sourceId);
    const destIndex = updColumns.findIndex((i) => i.id === destId);

    if (sourceId === destId) {
      updColumns[sourceIndex].tasks.forEach((item) => {
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
    } else {
      updColumns[sourceIndex].tasks = updColumns[sourceIndex].tasks.filter((i) => i.id !== taskId);
      updColumns[sourceIndex].tasks.forEach((item) => {
        if (item.order > ordPrev) {
          item.order -= 1;
        }
      });

      updColumns[destIndex].tasks.forEach((item) => {
        if (item.order >= ordNext) {
          item.order += 1;
        }
      });

      if (currTask?.order) {
        currTask.order = ordNext;
      }

      updColumns[destIndex].tasks = [...updColumns[destIndex].tasks, currTask as TaskResponse];
    }
    setBoard({ ...board, columns: updColumns });
    await updateTask(
      board.id,
      sourceId,
      taskId,
      currTask?.title as string,
      ordNext,
      currTask?.description as string,
      currTask?.userId as string,
      board.id,
      destId,
      logoutUser
    );
    loadBoard();
  };

  useEffect(() => {
    if (!isAuth && !localStorage.getItem('pmapp34-token')) {
      navigate('/welcome');
    } else {
      loadBoard();
    }
  }, [isAuth, window.location.href]);

  return (
    <div className="kanban-wrapper">
      <div className="board-header">
        <div className="board-header-title-wrapper">
          <Link className="board-header__btn" to="/">
            <i className="fa-solid fa-angle-left"> </i> Back
          </Link>
          <h1 className="board-header__title">{board.title}</h1>
        </div>
        {board.description !== ' ' && (
          <h3 className="board-header__title board-header__title-desc">{board.description}</h3>
        )}
      </div>
      <div className="board">
        <ColumnList
          boardId={boardId}
          columns={board.columns}
          loadBoard={loadBoard}
          reorderColumns={reorderColumns}
          reorderTasks={reorderTasks}
        />
      </div>
    </div>
  );
}

export default BoardPage;
