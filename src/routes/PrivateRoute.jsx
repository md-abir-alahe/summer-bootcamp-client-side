import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <div className='min-h-screen flex justify-center items-center'>
            <button className="btn ">
                <span className="loading loading-spinner"></span>
                Please Wait...
            </button>
        </div>
    }

    if(user){
        return children;
    }
    return <Navigate to={`/login`} state={{from: location}} replace></Navigate>
};

export default PrivateRoute;