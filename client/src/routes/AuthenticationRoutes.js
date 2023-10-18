import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import {Navigate} from "react-router-dom"
const AuthLogin = Loadable(lazy(() => import('views/LoginPage')));
const AuthRegister = Loadable(lazy(() => import('views/SignupPage')));

const AuthenticationRoutes = {
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/signup',
      element: <AuthRegister />
    },
    {
      path: '*',
      element: <Navigate to={"/login"}/>
    }
  ]
};

export default AuthenticationRoutes;
