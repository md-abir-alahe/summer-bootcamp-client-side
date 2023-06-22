import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useInstructor from '../hooks/useInstructor';
import { Navigate, useLocation } from 'react-router-dom';

const InstructorRoute = ({children}) => {
    const {user , loading} = useContext(AuthContext);
    const [isInstructor, isInstructorLoading] = useInstructor();
    const location = useLocation();

    if(loading || isInstructorLoading){
        return <div className='min-h-screen flex justify-center items-center'>
            <button className="btn ">
                <span className="loading loading-spinner"></span>
                Please Wait...
            </button>
        </div>
    }

    if(user && isInstructor) {
        return children;
    }
    return <Navigate to={`/`} state={{from: location}} replace></Navigate>
};

export default InstructorRoute;