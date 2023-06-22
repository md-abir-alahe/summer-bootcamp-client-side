import React, { useContext } from 'react';
import { ThemeContext } from '../../../../providers/ThemeProvider';
import { Zoom } from "react-awesome-reveal";

const BannerItem = ({ heading, subHeading, img }) => {
    const { dark } = useContext(ThemeContext);
    return (
        <div className='flex md:flex-row flex-col gap-6 justify-between items-center px-4 md:px-10'>
            <div className='md:w-1/2 text-left'>
                    <h1 className='dark:text-white text-slate-900 text-6xl font-bold'>{heading}</h1>
                    <p className='mt-6 mb-10 dark:text-slate-300 text-slate-700 text-xl'>" {subHeading} "</p>
                <Zoom>
                    <button className={dark ? "primary-btn-filled" : "primary-btn-filled-light"}>Explore more</button>
                </Zoom>
            </div>
            <img className='md:w-1/2 max-h-[300px] max-w-[300px] md:max-h-[450px] md:max-w-[450px]' src={img} />
        </div>
    );
};

export default BannerItem;