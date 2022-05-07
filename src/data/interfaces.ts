import React, { Dispatch, SetStateAction } from 'react';

export interface SearchCardData {
  datetaken: string;
  id: string;
  tags: string;
  title: string;
  url_l: string;
}

export interface ApiResponse {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    photo: SearchCardData[];
    total: number;
  };
}

export interface ApiAction {
  type: string;
  payload: ApiResponse;
}

export interface SortAction {
  type: string;
}

export type SortTypes =
  | 'date-posted-desc'
  | 'date-posted-asc'
  | 'date-taken-desc'
  | 'date-taken-asc';

export type SortActions = 'POSTED_DESC' | 'POSTED_ASC' | 'DATE_DESC' | 'DATE_ASC';

export interface PaginationAction {
  type: string;
  payload: number;
}

export interface PaginationData {
  page: number;
  pages: number;
  perpage: number;
}

export interface SearchInfo extends SearchCardData {
  isShown: boolean;
}

export interface SearchInfoAction {
  type: string;
  payload: SearchInfo;
}

export interface AppContextData {
  lang: string;
  switchLang: Dispatch<React.SetStateAction<string>>;
  apiPhotos: ApiResponse;
  dispatchApiQuery: Dispatch<ApiAction>;
  sort: SortTypes;
  dispatchSort: Dispatch<SortAction>;
  pagination: PaginationData;
  dispatchPagination: Dispatch<PaginationAction>;
  searchInfo: SearchInfo;
  dispatchSearchInfo: Dispatch<SearchInfoAction>;
  isAuth: boolean;
  setIsAuth: Dispatch<React.SetStateAction<boolean>>
}

export interface AuthPopupData {
  message: string;
  setIsPopupShown: Dispatch<SetStateAction<boolean>>;
}
