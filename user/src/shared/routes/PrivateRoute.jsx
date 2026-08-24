// src/shared/routes/PrivateRoute.js
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const allowedRoles = ["guest", "host", "guestbusiness"];
  //   const role = useSelector((state) => state.auth.role); // adapt as needed
  const role = "guest"
  return allowedRoles.includes(role) ? children : <Navigate to="/" />;
};

export default PrivateRoute;
