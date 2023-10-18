import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import {VerifyToken} from "../utils/Functions";


export default function ThemeRoutes() {
  const token = localStorage.getItem("token");
  let DecodedToken = null
  if (token) {
    DecodedToken = VerifyToken(token);
  }

  return useRoutes([(token && DecodedToken?.user?.Name) ? MainRoutes : AuthenticationRoutes]);
}
