import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({children}) => {
    const {user,loading} =useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <div className='min-h-screen flex justify-center items-center'>
            <button className="btn ">
                <span className="loading loading-spinner"></span>
                Please Wait...
            </button>
        </div>
    }

    if(user && isAdmin) {
        return children;
    }

    return <Navigate to={`/`} state={{from: location}} replace></Navigate>
};

export default AdminRoute;