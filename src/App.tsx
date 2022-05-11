import { createContext, useMemo, useReducer, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './sass/App.scss';
import './sass/index.scss';
import './sass/normalize.scss';
import { ROUTES_LIST } from './utils/router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';
import { AppContextData } from './data/interfaces';
import {
  RESP_DEFAULT,
  API_SORT_DEFAULT,
  PAGINATION_DEFAULT,
  SEARCH_INFO_DEFAULT,
  LANG_RU,
  CONFIRM_MODAL_DEFAULT,
} from './data/constants';
import {
  confirmReducer,
  boardsReducer,
  apiReducer,
  paginationReducer,
  searchInfoReducer,
  sortReducer,
} from './utils/reducers';

export const AppContext = createContext({} as AppContextData);

function App() {
  const [lang, switchLang] = useState(LANG_RU);
  const [boards, dispatchBoards] = useReducer(boardsReducer, []);
  const [isAuth, setIsAuth] = useState(false);
  const [confirm, dispatchConfirm] = useReducer(confirmReducer, CONFIRM_MODAL_DEFAULT);
  // old search page data
  const [apiPhotos, dispatchApiQuery] = useReducer(apiReducer, RESP_DEFAULT);
  const [sort, dispatchSort] = useReducer(sortReducer, API_SORT_DEFAULT);
  const [pagination, dispatchPagination] = useReducer(paginationReducer, PAGINATION_DEFAULT);
  const [searchInfo, dispatchSearchInfo] = useReducer(searchInfoReducer, SEARCH_INFO_DEFAULT);

  const store = useMemo(
    () => ({
      apiPhotos,
      dispatchApiQuery,
      sort,
      dispatchSort,
      pagination,
      dispatchPagination,
      searchInfo,
      dispatchSearchInfo,
      lang,
      switchLang,
      isAuth,
      setIsAuth,
      boards,
      dispatchBoards,
      confirm,
      dispatchConfirm,
    }),
    [apiPhotos, sort, pagination, searchInfo, lang, isAuth, boards, confirm]
  );

  return (
    <AppContext.Provider value={store}>
      <BrowserRouter>
        <Header />
        <main className="main-container">
          <Routes>
            {ROUTES_LIST.map(({ path, element }, ind) => (
              <Route path={path} element={element} key={`route_${ind + 1}`} />
            ))}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
      {confirm.isOpen && <ConfirmModal />}
    </AppContext.Provider>
  );
}

export default App;
