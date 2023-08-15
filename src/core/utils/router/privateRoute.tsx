import {Navigate, Outlet} from "react-router-dom";

export const PrivateRoute = () => {
    return JSON.parse(localStorage.getItem("user")!) ? <Outlet /> : <Navigate to="/login"/>
}