import { Outlet, Navigate } from "react-router-dom";
import getUserData from "./token/Token";
const DoctorRouters = () => {
    if(!getUserData()){
        return <Navigate to="/login" />
    }
    else if(getUserData().user.roles.includes("DOCTOR")){
        return <Outlet />;
    }
    return (<div>Not Access</div>)

};
export default DoctorRouters;
