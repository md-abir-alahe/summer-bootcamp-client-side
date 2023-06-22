import React, { useContext } from 'react';
import logo from '../../../assets/images/logo/websiteLogo.png'
import logoLight from '../../../assets/images/logo/websiteLogoLight.png'

import { Link, useNavigate } from 'react-router-dom';
import { FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { AuthContext } from '../../../providers/AuthProvider';
import { ThemeContext } from '../../../providers/ThemeProvider';
import useAdmin from '../../../hooks/useAdmin';
import useInstructor from '../../../hooks/useInstructor';

const Navbar = () => {
    const { dark, handleThemeToggle } = useContext(ThemeContext);
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    // TODO: load isInstructor
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();


    const navItems = <>
        <li><Link to={`/`} className='hover:bg-slate-600 hover:text-white'>Home</Link></li>
        <li><Link to={`/instructors`} className='hover:bg-slate-600 hover:text-white'>Instructors</Link></li>
        <li><Link to={`/classes`} className='hover:bg-slate-600 hover:text-white'>Classes</Link></li>
        {
            isAdmin ?
                <li><Link to={`/dashboard/admin`} className='hover:bg-slate-600 hover:text-white'>Dashboard</Link></li>
                : isInstructor ?
                    <li><Link to={`/dashboard/instructor`} className='hover:bg-slate-600 hover:text-white'>Dashboard</Link></li>
                    : user ?
                    <li><Link to={`/dashboard/student`} className='hover:bg-slate-600 hover:text-white'>Dashboard</Link></li> 
                    : <></>
        }
    </>

    // handle log out
    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/');
            })
    }


    return (
        <div>
            <div className="navbar bg-base-200 dark:bg-[#111928] border-b border-slate-600 dark:text-slate-300 font-semibold px-2 md:px-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-[#111928] rounded-box w-52 font-semibold text-base z-50">
                            {navItems}
                        </ul>
                    </div>
                    <Link to={`/`}>{dark ? <img src={logo} alt="" /> : <img src={logoLight} alt="" />}</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold text-base">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end gap-3">
                    <button onClick={() => handleThemeToggle()}>{dark ? <FiSun className='text-slate-300'></FiSun> : <FaMoon className='text-slate-900'></FaMoon>}</button>
                    {
                        user ? <>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={1} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.photoURL} />
                                    </div>
                                </label>
                                <ul tabIndex={1} className="mt-4 p-2 shadow menu menu-sm dropdown-content bg-base-100 dark:bg-[#172131] rounded-box w-52 z-50">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><button onClick={handleLogOut}>Logout</button></li>
                                </ul>
                            </div>
                        </> :
                            <Link to={`/login`} className={dark ? "primary-btn-filled" : "primary-btn-filled-light"}>Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;