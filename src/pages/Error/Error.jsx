import React, { useContext } from 'react';
import img from '../../assets/images/error/404.gif'
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../providers/themeProvider';

const Error = () => {
    const { dark } = useContext(ThemeContext);
    return (
        <div className={dark ? 'dark' : ''}>
            <div className='dark:bg-[#0C1222] flex flex-col items-center justify-center gap-3 py-12 min-h-screen'>
                <img className='rounded-3xl' src={img} alt="404" />
                <Link to={`/`}>
                    <button className='primary-btn-filled'>Back To Homepage</button>
                </Link>
            </div>
        </div>
    );
};

export default Error;