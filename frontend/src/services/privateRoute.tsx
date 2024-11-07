import {Navigate, Outlet} from "react-router-dom";


const PrivateRoute = () => {

    if(localStorage.getItem("isLoggedIn") === "true"){
        return (
          <Outlet/>
        );
    } else {
        return (
          <Navigate to="/"></Navigate>
        );
    }
}

export default PrivateRoute;