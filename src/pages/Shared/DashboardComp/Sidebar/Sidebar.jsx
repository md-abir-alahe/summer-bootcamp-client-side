import React from 'react';
import { useState } from 'react';
import { FaBars, FaBookOpen, FaChalkboardTeacher, FaChevronUp, FaClipboardCheck, FaClipboardList, FaCreditCard, FaHome, FaUser, FaUserShield } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import useAdmin from '../../../../hooks/useAdmin';
import useInstructor from '../../../../hooks/useInstructor';

const Sidebar = () => {

    const [open, setOpen] = useState(false);

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    return (
        <div className='w-full md:w-3/12 dark:bg-[#1E293B] bg-slate-200 dark:text-slate-100 px-4 pt-3 md:py-4'>
            <button onClick={() => setOpen(!open)} className="btn btn-circle mb-3 md:hidden">
                {
                    open ? <FaChevronUp></FaChevronUp> : <FaBars></FaBars>
                }
            </button>
            <div className={open ? "absolute dark:bg-[#1E293B] bg-slate-200 rounded-md p-3 z-10 mt-1" : "hidden md:flex md:flex-col"}>
                <div className='border-b-2 pb-3 flex flex-col gap-1'>
                    {
                        isAdmin ? <>
                            <NavLink to={`/dashboard/admin`} className='hover:bg-slate-600 px-2 py-2  hover:text-white flex items-center gap-2'><FaUser></FaUser> Admin Home</NavLink>
                            <NavLink to={`/dashboard/manage-classes`} className='hover:bg-slate-600 px-2 py-2  hover:text-white flex items-center gap-2'><FaClipboardList></FaClipboardList> Manage Classes</NavLink>
                            <NavLink to={`/dashboard/mange-users`} className='hover:bg-slate-600 px-2 py-2  hover:text-white flex items-center gap-2'><FaClipboardCheck></FaClipboardCheck> Manage Users</NavLink>
                        </> : isInstructor ? <>
                            <NavLink to={`/dashboard/instructor`} className='hover:bg-slate-600 px-2 py-2  hover:text-white flex items-center gap-2'><FaUser></FaUser> Instructor Home</NavLink>
                            <NavLink to={`/dashboard/my-classes`} className='hover:bg-slate-600 px-2 py-2  hover:text-white flex items-center gap-2'><FaClipboardList></FaClipboardList> My Classes</NavLink>
                            <NavLink to={`/dashboard/add-a-class`} className='hover:bg-slate-600 px-2 py-2  hover:text-white flex items-center gap-2'><FaClipboardCheck></FaClipboardCheck> Add A Class</NavLink>
                        </> : <>
                            <NavLink to={`/dashboard/student`} className='hover:bg-slate-600 px-2 py-2  hover:text-white flex items-center gap-2'><FaUser></FaUser> Student Home</NavLink>
                            <NavLink to={`/dashboard/my-enrolled-class`} className='hover:bg-slate-600 px-2 py-2  hover:text-white flex items-center gap-2'><FaClipboardCheck></FaClipboardCheck> My Enrolled Class</NavLink>
                            <NavLink to={`/dashboard/my-selected-class`} className='hover:bg-slate-600 px-2 py-2  hover:text-white flex items-center gap-2'><FaClipboardList></FaClipboardList> My Selected Class</NavLink>
                            <NavLink to={`/dashboard/payment-history`} className='hover:bg-slate-600 px-2 py-2  hover:text-white flex items-center gap-2'><FaCreditCard></FaCreditCard> My Payment History</NavLink>
                        </>
                    }
                </div>
                <div className='mt-3 flex-col flex'>
                    <NavLink to={`/`} className='hover:bg-slate-600 px-2 py-2  hover:text-white flex items-center gap-2'><FaHome></FaHome> Home</NavLink>
                    <NavLink to={`/instructors`} className='hover:bg-slate-600 px-2 py-2  hover:text-white flex items-center gap-2'><FaChalkboardTeacher></FaChalkboardTeacher>Instructors</NavLink>
                    <NavLink to={`/classes`} className='hover:bg-slate-600 px-2 py-2  hover:text-white flex items-center gap-2'><FaBookOpen></FaBookOpen> Classes</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;