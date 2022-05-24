/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { ColumnsResponse } from '../../data/interfacesV';
import CreateColumnModal from '../CreateColumnModal/CreateColumnModal';
import './ColumnList.scss';
import Column from '../Column/Column';
import updateColumn from '../../api/updateColumn';
import { AppContext } from '../../App';

function ColumnList({
  boardId,
  columns,
  loadBoard,
  reorderColumns,
  reorderTasks,
}: {
  boardId: string;
  columns: ColumnsResponse[];
  loadBoard: () => Promise<void>;
  reorderColumns: (ordPrev: number, ordNext: number) => void;
  reorderTasks: (
    taskId: string,
    sourceId: string,
    destId: string,
    ordPrev: number,
    ordNext: number
  ) => void;
}) {
  const [isColCreateOpen, setIsColCreateOpen] = useState(false);
  const { logoutUser } = useContext(AppContext);

  const columnsCopy = [...columns];
  columnsCopy.forEach((i) => i.tasks.sort((a, b) => a.order - b.order));
  const columnsSorted = columnsCopy.sort((a, b) => a.order - b.order);

  const handleDragEnd = async (results: DropResult) => {
    if (!results.destination) return;
    if (
      results.destination.droppableId === results.source.droppableId &&
      results.destination.index === results.source.index
    )
      return;
    if (results.type === 'COLUMN') {
      reorderColumns(results.source.index, results.destination.index);
      const currTitle = columns.find((i) => i.id === results.draggableId)?.title;
      await updateColumn(
        boardId,
        results.draggableId,
        results.destination.index,
        logoutUser,
        currTitle
      );
      loadBoard();
    } else if (results.type === 'TASK') {
      reorderTasks(
        results.draggableId,
        results.source.droppableId,
        results.destination.droppableId,
        results.source.index,
        results.destination.index
      );
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="columns-wrapper-id" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div className="dnd-wrapper" {...provided.droppableProps} ref={provided.innerRef}>
              {columnsSorted.map((col, index) => {
                return (
                  <Draggable key={col.id} draggableId={col.id} index={index + 1}>
                    {(provColumn, snapColumn) => (
                      <Column
                        drProps={{ ...provColumn.draggableProps }}
                        drHandleProps={
                          { ...provColumn.dragHandleProps } as DraggableProvidedDragHandleProps
                        }
                        isDragging={snapColumn.isDragging}
                        innerRef={provColumn.innerRef}
                        columnId={col.id}
                        boardId={boardId}
                        title={col.title}
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
          loadBoard={loadBoard}
          setIsColCreateOpen={setIsColCreateOpen}
        />
      )}
    </>
  );
}

export default ColumnList;
