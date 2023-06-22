import React from 'react';
import { Slide, Fade } from "react-awesome-reveal";

const SectionTitle = ({img, heading, subHeading}) => {
    return (
        <div className='flex flex-col justify-center items-center mt-14 mb-12 text-center p-3 mb:p-10'>
           <Slide cascade>
                <img className='max-w-[100px]' src={img} />
            </Slide>
                <Fade cascade>
                    <h1 className='dark:text-[#38DBF8] text-purple-600 text-5xl font-bold mb-3'>{heading}</h1>
                    <p className='text-2xl dark:text-slate-300'>{subHeading}</p>
                </Fade>
        </div>
    );
};

export default SectionTitle;