import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const userAuth = () => {
  const userToken = Cookies.get("userToken");
  if (userToken) {
    return true;
  } else {
    return false;
  }
};

const LoginRoute = () => {
  const isAuth = userAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default LoginRoute;
