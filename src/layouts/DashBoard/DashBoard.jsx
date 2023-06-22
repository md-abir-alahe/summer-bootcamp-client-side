import React from 'react';
import Sidebar from '../../pages/Shared/DashboardComp/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../providers/ThemeProvider';

const DashBoard = () => {
    const {dark} = useContext(ThemeContext);
    return (
        <div className={dark ? "dark" : ""}>
            <div className='dark:bg-[#0F172A] min-h-screen flex flex-col md:flex-row dashboard'>
                <Sidebar></Sidebar>
                <div className='w-full p-4 '>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;