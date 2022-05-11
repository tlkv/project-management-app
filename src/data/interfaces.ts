import React, { Dispatch, SetStateAction } from 'react';

export interface BoardsResponse {
  id: string;
  title: string;
}

export interface BoardsAction {
  type: string;
  payload: BoardsResponse[];
}

export interface ConfirmStatus {
  question: string;
  isOpen: boolean;
  proceed: null | ((value?: unknown) => void);
  cancel: null | ((reason?: unknown) => void);
}

export interface ConfirmAction {
  type: string;
  payload: Partial<ConfirmStatus>;
}

export interface AppContextData {
  isAuth: boolean;
  setIsAuth: Dispatch<React.SetStateAction<boolean>>;
  lang: string;
  switchLang: Dispatch<React.SetStateAction<string>>;
  boards: BoardsResponse[];
  dispatchBoards: Dispatch<BoardsAction>;
  confirm: ConfirmStatus;
  dispatchConfirm: Dispatch<ConfirmAction>;
}

export interface AuthPopupData {
  message: string;
  setIsPopupShown: Dispatch<SetStateAction<boolean>>;
}
