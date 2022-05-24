import React, { Dispatch, SetStateAction } from 'react';
import { Languages } from './interfacesA';

export interface BoardsResponse {
  id: string;
  title: string;
  description: string;
}

export interface BoardsAction {
  type: string;
  payload: BoardsResponse[];
}

export interface AppContextData {
  isAuth: boolean;
  setIsAuth: Dispatch<React.SetStateAction<boolean>>;
  lang: Languages;
  switchLang: Dispatch<React.SetStateAction<Languages>>;
  boards: BoardsResponse[];
  dispatchBoards: Dispatch<BoardsAction>;
  logoutUser: () => void;
}

export interface AuthPopupData {
  message: string;
  setIsPopupShown: Dispatch<SetStateAction<boolean>>;
}
