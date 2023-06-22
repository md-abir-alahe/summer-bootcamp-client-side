import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import sectionImg from '../../../assets/images/section/popularInstructor.png'
import { useState } from 'react';
import { useEffect } from 'react';


const PopularInstructor = () => {
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        fetch('https://summer-camp-school-server-five.vercel.app/popular-instructors')
            .then(res => res.json())
            .then(data => setInstructors(data))
    }, []);
    return (
        <div className='px-4 md:px-12'>
            <SectionTitle
                img={sectionImg}
                heading={`Popular Instructors`}
                subHeading={"Meet with Best instructors around the globe"}
            ></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
               {
                instructors.map(item => <div
                    key={item._id}
                >
                    <div className="card card-side dark:bg-[rgba(30,41,59,.6)] bg-slate-200 shadow-xl h-full">
                        <figure className='w-1/2'><img className='w-full h-full' src={item.instructorImage} alt="Movie" /></figure>
                        <div className="card-body ite justify-center ">
                            <h2 className="card-title dark:text-slate-200 text-lg md:text-3xl font-bold">{item.instructorName}</h2>
                        </div>
                    </div>
                </div>)
               }
            </div>
        </div>
    );
};

export default PopularInstructor;