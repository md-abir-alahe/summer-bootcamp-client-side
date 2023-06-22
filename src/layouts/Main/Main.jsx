import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../pages/Shared/Navbar/Navbar';
import Footer from '../../pages/Shared/Footer/Footer';
import { ThemeContext } from '../../providers/ThemeProvider';

const Main = () => {
    const {dark} = useContext(ThemeContext);
    return (
        <div className={dark ? "dark" : ""}>
            <div className='dark:bg-gradient-to-r from-[#0F1629] to-[#0B1120]'>
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;