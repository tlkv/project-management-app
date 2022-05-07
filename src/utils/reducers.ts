import {
  ApiAction,
  ApiResponse,
  SortAction,
  SortTypes,
  PaginationData,
  PaginationAction,
  SearchInfo,
  SearchInfoAction,
  BoardsResponse,
  BoardsAction,
} from '../data/interfaces';
import {
  API_PAGE_DEFAULT,
  API_QUERY,
  DEF_PAGE,
  SET_BOARDS,
  NEXT_PAGE,
  PREV_PAGE,
  SEARCH_INFO,
  SORT_TYPES,
  UPD_PER_PAGE,
} from '../data/constants';

export const paginationReducer = (state: PaginationData, { type, payload }: PaginationAction) => {
  switch (type) {
    case UPD_PER_PAGE:
      return payload > 0 ? { ...state, perpage: payload, page: API_PAGE_DEFAULT } : state;
    case NEXT_PAGE:
      return state.page < payload ? { ...state, page: state.page + 1 } : state;
    case PREV_PAGE:
      return state.page > 1 ? { ...state, page: state.page - 1 } : state;
    case DEF_PAGE:
      return { ...state, page: 1 };
    default:
      return state;
  }
};

export const sortReducer = (state: SortTypes, { type }: SortAction) => {
  switch (type) {
    case SORT_TYPES.POSTED_DESC.action:
      return SORT_TYPES.POSTED_DESC.value;
    case SORT_TYPES.POSTED_ASC.action:
      return SORT_TYPES.POSTED_ASC.value;
    case SORT_TYPES.DATE_DESC.action:
      return SORT_TYPES.DATE_DESC.value;
    case SORT_TYPES.DATE_ASC.action:
      return SORT_TYPES.DATE_ASC.value;
    default:
      return state;
  }
};

export const apiReducer = (state: ApiResponse, { type, payload }: ApiAction) => {
  switch (type) {
    case API_QUERY:
      return payload;
    default:
      return state;
  }
};

export const searchInfoReducer = (state: SearchInfo, { type, payload }: SearchInfoAction) => {
  switch (type) {
    case SEARCH_INFO:
      return payload;
    default:
      return state;
  }
};

export const boardsReducer = (state: BoardsResponse[], { type, payload }: BoardsAction) => {
  switch (type) {
    case SET_BOARDS:
      return payload;
    default:
      return state;
  }
};
