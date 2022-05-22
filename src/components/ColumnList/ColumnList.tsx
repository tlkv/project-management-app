/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { ColumnsResponse } from '../../data/interfacesV';
import CreateColumnModal from '../CreateColumnModal/CreateColumnModal';
import deleteColumn from '../../api/deleteColumn';
import useConfirm from '../../utils/useConfirm';
import './ColumnList.scss';
import Column from '../Column/Column';
import updateColumn from '../../api/updateColumn';

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
  const { isConfirmed } = useConfirm();

  const columnsCopy = [...columns];
  const newColOrder = columnsCopy.length
    ? columnsCopy.sort((a, b) => b.order - a.order)[0].order + 1
    : 1;
  const columnsSortedByOrder = columnsCopy.sort((a, b) => a.order - b.order);

  const handleDelete = async (colId: string) => {
    const confirmed = await isConfirmed(
      `Are you sure? Column will be deleted along with all tasks`
    );
    if (confirmed) {
      const res = await deleteColumn(boardId, colId);
      if (res) {
        loadBoard();
      }
    }
  };

  const handleColumnDragEnd = async (results: DropResult) => {
    if (!results.destination) return;
    const res = await updateColumn(boardId, results.draggableId, results.destination.index + 1);
    if (res) {
      loadBoard();
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleColumnDragEnd}>
        <Droppable droppableId="columns-wrapper-id" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {columnsSortedByOrder.map((col, index) => {
                return (
                  <Draggable key={col.id} draggableId={col.id} index={index}>
                    {(provColumn) => (
                      <Column
                        drProps={{ ...provColumn.draggableProps }}
                        drHandleProps={
                          { ...provColumn.dragHandleProps } as DraggableProvidedDragHandleProps
                        }
                        innerRef={provColumn.innerRef}
                        columnId={col.id}
                        boardId={boardId}
                        title={col.title}
                        handleDelete={() => handleDelete(col.id)}
                        tasks={col.tasks}
                        loadBoard={loadBoard}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
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
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {isColCreateOpen && (
        <CreateColumnModal
          boardId={boardId}
          order={newColOrder}
          loadBoard={loadBoard}
          setIsColCreateOpen={setIsColCreateOpen}
        />
      )}
    </>
  );
}

export default ColumnList;
