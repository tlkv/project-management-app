import { useState } from 'react';
import { ColumnsResponse } from '../../data/interfacesV';
import CreateColumnModal from '../CreateColumnModal/CreateColumnModal';
import './ColumnList.scss';
import Column from '../Column/Column';

function ColumnList({
  boardId,
  columns,
  loadBoard,
}: {
  boardId: string;
  columns: ColumnsResponse[];
  loadBoard: () => Promise<void>;
}) {
  const [isColCreateOpen, setIsColCreateOpen] = useState(false);

  const columnsCopy = [...columns];
  const columnsSortedByOrder = columnsCopy.sort((a, b) => a.order - b.order);

  const columnArray = columnsSortedByOrder.map((col) => (
    <Column
      key={col.id}
      columnId={col.id}
      boardId={boardId}
      title={col.title}
      tasks={col.tasks}
      loadBoard={loadBoard}
    />
  ));

  return (
    <>
      {columnArray}
      <div className="list-wrapper">
        <button
          className="board__add-list board__add-list-btn"
          type="button"
          onClick={() => setIsColCreateOpen(true)}
        >
          <i className="fa-solid fa-plus"> </i>
          Add list
        </button>
      </div>
      {isColCreateOpen && (
        <CreateColumnModal
          boardId={boardId}
          loadBoard={loadBoard}
          setIsColCreateOpen={setIsColCreateOpen}
        />
      )}
    </>
  );
}

export default ColumnList;
