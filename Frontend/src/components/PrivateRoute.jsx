import { Navigate } from "react-router-dom";

function PrivateRoute({ children, loggedIn }) {
    return loggedIn ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
