import { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './sass/App.scss';
import './sass/index.scss';
import './sass/normalize.scss';
import { ROUTES_LIST } from './utils/router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';
import { AppContextData } from './data/interfaces';
import { LANG_EN } from './data/constants';
import { CONFIRM_MODAL_DEFAULT } from './data/constantsV';
import { confirmReducer, boardsReducer } from './utils/reducers';
import { Languages } from './data/interfacesA';

export const AppContext = createContext({} as AppContextData);

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [lang, switchLang] = useState(LANG_EN);
  const [boards, dispatchBoards] = useReducer(boardsReducer, []);
  const [confirm, dispatchConfirm] = useReducer(confirmReducer, CONFIRM_MODAL_DEFAULT);

  useEffect(() => {
    if (localStorage.getItem('pmapp34-token')) {
      setIsAuth(true);
    }
  }, [isAuth]);

  useEffect(() => {
    if (localStorage.getItem('pmapp34-lang')) {
      switchLang(localStorage.getItem('pmapp34-lang') as Languages);
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem('pmapp34-token');
    setIsAuth(false);
  };

  const store = useMemo(
    () => ({
      lang,
      switchLang,
      isAuth,
      setIsAuth,
      boards,
      dispatchBoards,
      confirm,
      dispatchConfirm,
      logoutUser,
    }),
    [lang, isAuth, boards, confirm]
  );

  return (
    <AppContext.Provider value={store}>
      <ToastContainer />
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
