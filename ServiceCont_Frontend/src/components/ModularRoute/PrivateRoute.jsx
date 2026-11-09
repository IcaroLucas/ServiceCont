import { Navigate } from "react-router";
import { isTokenExpired, clearSession } from "../../utils/auth";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const valid = token && !isTokenExpired(token);

  if (!valid) {
    clearSession();
  }

  return valid ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
