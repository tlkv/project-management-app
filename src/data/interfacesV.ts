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
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface SearchTaskResponse {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  user: {
    name: string;
  };
  boardId: string;
  columnId: string;
}

export interface SearchTaskCard extends SearchTaskResponse {
  loadTasks: () => Promise<void>;
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
