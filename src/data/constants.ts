import { Languages } from './interfacesA';

export const API_URL = 'https://rs-team-34.herokuapp.com';

export const LANG_RU: Languages = 'RU';
export const LANG_EN: Languages = 'EN';

export const SET_BOARDS = 'SET_BOARDS';

export const CONFIRM_MODAL_DEFAULT = {
  question: '',
  isOpen: false,
  proceed: null,
  cancel: null,
};

export const CONFIRM_MODAL_INIT = 'CONFIRM_MODAL_INIT';
export const CONFIRM_MODAL_CLOSE = 'CONFIRM_MODAL_CLOSE';
