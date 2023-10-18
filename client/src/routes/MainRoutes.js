import { lazy } from 'react';
import {Navigate} from "react-router-dom"
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PasswordResetPage from "../views/PasswordResetPage";
import PostDetails from "../views/PostDetails";
const Home = Loadable(lazy(() => import('views/HomePage')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/post/:id',
      element: <PostDetails/>
    },
    {
      path: "/password/reset",
      element: <PasswordResetPage/>
    },
    {
      path: "*",
      element: <Navigate to={"/"}/>
    }
  ]
};

export default MainRoutes;
