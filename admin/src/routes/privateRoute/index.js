import { Navigate } from "react-router-dom"; // ✅ FIXED import
import { getToken } from "../../utills/pip";
import { pageRoutes } from "../PageRoutes";

const AdminPrivateRoute = ({ children }) => {
    const token = getToken('admin');
    if (!token) {
        return <Navigate to={pageRoutes.login} replace />;
    }
    return children;
};

export default AdminPrivateRoute;
