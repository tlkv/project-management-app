import { Languages } from './interfaces';

export const API_URL = 'https://rs-team-34.herokuapp.com';

export const LANG_RU: Languages = 'RU';
export const LANG_EN: Languages = 'EN';

// eslint-disable-next-line no-useless-escape
export const passRegExp = /^[a-zA-Z0-9!@#$&()\\-`.+,/\"]{8,30}$/;
export const userRegExp = /^[A-Za-z0-9]{4,20}$/;
export const message = '8-30 letters (eng) or numbers or ! @ # $ & ( ) - ‘ . / + ,';

export const SET_BOARDS = 'SET_BOARDS';

export const FORM_INVALID_MESSAGE = 'at least one character';
export const titleRegex = /^.*[^\s].*$/;
