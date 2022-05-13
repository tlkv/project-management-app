import { BoardsResponse, BoardsAction, ConfirmStatus, ConfirmAction } from '../data/interfaces';
import { SET_BOARDS, CONFIRM_MODAL_INIT, CONFIRM_MODAL_CLOSE } from '../data/constantsV';

export const boardsReducer = (state: BoardsResponse[], { type, payload }: BoardsAction) => {
  switch (type) {
    case SET_BOARDS:
      return payload;
    default:
      return state;
  }
};

export const confirmReducer = (state: ConfirmStatus, { type, payload }: ConfirmAction) => {
  switch (type) {
    case CONFIRM_MODAL_INIT:
      return payload as ConfirmStatus;
    case CONFIRM_MODAL_CLOSE:
      return { ...state, ...payload } as ConfirmStatus;
    default:
      return state;
  }
};
