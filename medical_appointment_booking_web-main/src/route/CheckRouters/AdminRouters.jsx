import { Outlet, Navigate } from "react-router-dom";
import getUserData from "./token/Token";

const AdminRouters = () => {
    if(!getUserData()){
        return <Navigate to="/login" />
    }
    else if(getUserData().user.roles.includes("ADMIN")){
        return <Outlet />;
    }
    return (<div>Not Access</div>)

};
export default AdminRouters;
