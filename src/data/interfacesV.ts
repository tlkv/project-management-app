export interface NewBoard {
  title: string;
  description: string;
}

export interface ColumnResponse {
  id: string;
  title: string;
  order: number;
}

export interface TaskResponse {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface ColumnsResponse extends ColumnResponse {
  tasks: TaskResponse[];
}

export interface BoardResponse {
  id: string;
  title: string;
  description: string;
  columns: ColumnsResponse[];
}
