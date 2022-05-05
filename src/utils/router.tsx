import { Navigate } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import MainPage from '../pages/MainPage/MainPage';
import BoardPage from '../pages/BoardPage/BoardPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

import SearchPage from '../pages/_SearchPage/SearchPage';
import SearchDetailsPage from '../pages/_SeatchDetailsPage/SearchDetailsPage';

export const ROUTES_LIST = [
  {
    path: '/_search',
    element: <SearchPage />,
    navbarText: '_Flickr(test)',
    onNavbar: true,
  },
  {
    path: '/_search-details',
    element: <SearchDetailsPage />,
    navbarText: '_Search Details',
    onNavbar: false,
  },
  {
    path: '/welcome',
    element: <WelcomePage />,
    navbarText: 'Welcome',
    onNavbar: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
    navbarText: 'Login',
    onNavbar: false,
  },
  {
    path: '/',
    element: <MainPage />,
    navbarText: 'Main',
    onNavbar: true,
  },
  {
    path: '/board',
    element: <BoardPage />,
    navbarText: 'Board',
    onNavbar: true,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    navbarText: 'Edit Profile',
    onNavbar: false,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
    navbarText: '404',
    onNavbar: false,
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
    navbarText: '404',
    onNavbar: false,
  },
];

export default ROUTES_LIST;
