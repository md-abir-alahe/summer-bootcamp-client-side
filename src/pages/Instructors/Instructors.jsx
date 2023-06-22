import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import sectionImg from '../../assets/images/section/popularInstructor.png'

const Instructors = () => {
    const instructors = useLoaderData();
    return (
        <div className='min-h-screen px-4 md:px-12 mt-10 mb-12'>
            <SectionTitle
                img={sectionImg}
                heading={`Instructors`}
                subHeading={"Meet with Best instructors around the globe"}
            ></SectionTitle>
            <div className='grid grid-cols-1 gap-6'>
                {
                    instructors.map(item => <div
                        key={item._id}
                    >
                        <div className="card card-side dark:bg-[rgba(30,41,59,.6)] bg-slate-200 shadow-xl h-96">
                            <figure className='w-1/2'><img className='w-full h-full' src={item.instructorImage} alt="Movie" /></figure>
                            <div className="card-body ite justify-center ">
                                <h2 className="card-title dark:text-slate-200 text-lg md:text-5xl font-bold">{item.instructorName}</h2>
                                <h2 className="dark:text-slate-300 text-sm md:text-xl font-bold">{item.instructorEmail}</h2>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Instructors;