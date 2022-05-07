import { ApiResponse, PaginationData, SearchInfo, SortTypes } from './interfaces';

export const LANG_RU = 'RU';
export const LANG_EN = 'EN';

export const API_URL = 'https://rs-team-34.herokuapp.com';
export const API_QUERY = 'API_QUERY';
export const UPD_SORT = 'UPD_SORT';
export const UPD_PER_PAGE = 'UPD_PER_PAGE';
export const PREV_PAGE = 'PREV_PAGE';
export const NEXT_PAGE = 'NEXT_PAGE';
export const DEF_PAGE = 'DEF_PAGE';
export const SEARCH_INFO = 'SEARCH_INFO';

export const SET_BOARDS = 'SET_BOARDS';

export const API_PAGE_DEFAULT = 1;
export const API_PAGES_AMOUNT_DEFAULT = 0;
export const API_PER_PAGE_DEFAULT = 24;
export const API_TOTAL_DEFAULT = 0;
export const API_SORT_DEFAULT: SortTypes = 'date-posted-desc';

export const RESP_DEFAULT: ApiResponse = {
  photos: {
    page: API_PAGE_DEFAULT,
    pages: API_PAGES_AMOUNT_DEFAULT,
    perpage: API_PER_PAGE_DEFAULT,
    photo: [],
    total: API_TOTAL_DEFAULT,
  },
};

export const SORT_TYPES = {
  POSTED_DESC: {
    action: 'POSTED_DESC',
    value: 'date-posted-desc' as SortTypes,
    title: 'Newest posts',
  },
  POSTED_ASC: {
    action: 'POSTED_ASC',
    value: 'date-posted-asc' as SortTypes,
    title: 'Oldest posts',
  },
  DATE_DESC: {
    action: 'DATE_DESC',
    value: 'date-taken-desc' as SortTypes,
    title: 'Newest taken',
  },
  DATE_ASC: {
    action: 'DATE_ASC',
    value: 'date-taken-asc' as SortTypes,
    title: 'Oldest taken',
  },
};

export const SORT_DEF: { [key in SortTypes]: string } = {
  'date-posted-desc': 'POSTED_DESC',
  'date-posted-asc': 'POSTED_ASC',
  'date-taken-desc': 'DATE_DESC',
  'date-taken-asc': 'DATE_ASC',
};

export const PAGINATION_DEFAULT: PaginationData = {
  page: API_PAGE_DEFAULT,
  pages: API_PAGES_AMOUNT_DEFAULT,
  perpage: API_PER_PAGE_DEFAULT,
};

export const SEARCH_INFO_DEFAULT: SearchInfo = {
  isShown: false,
  datetaken: '',
  id: '',
  tags: '',
  title: '',
  url_l: '',
};
