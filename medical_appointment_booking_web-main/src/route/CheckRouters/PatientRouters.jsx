import { Outlet, Navigate } from "react-router-dom";
import getUserData from "./token/Token";
const PatientRouters = () => {
    if(!getUserData()){
        return <Navigate to="/login" />
    }
    else if(getUserData().user.roles.includes("USER")){
        return <Outlet />;
    }
    return (<div>Not Access</div>)

};
export default PatientRouters;
