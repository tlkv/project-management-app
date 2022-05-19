import { Navigate } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import MainPage from '../pages/MainPage/MainPage';
import BoardPage from '../pages/BoardPage/BoardPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import StatsPage from '../pages/StatsPage/StatsPage';

export const ROUTES_LIST = [
  {
    path: '/welcome',
    element: <WelcomePage />,
    navbarText: 'Welcome',
    onNavbar: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
    navbarText: 'Sign In',
    onNavbar: false,
  },
  {
    path: '/registration',
    element: <LoginPage />,
    navbarText: 'Sign up',
    onNavbar: false,
  },
  {
    path: '/',
    element: <MainPage />,
    navbarText: 'Main',
    onNavbar: true,
  },
  {
    path: '/board/:id',
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
    path: '/stats',
    element: <StatsPage />,
    navbarText: 'Statistics',
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
