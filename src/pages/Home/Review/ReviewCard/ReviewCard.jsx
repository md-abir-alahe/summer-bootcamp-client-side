import React from 'react';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import Tilt from 'react-parallax-tilt';

const ReviewCard = ({review}) => {
    const {name, profileImg, rating, reviewDescription } = review;
    return (
        <Tilt scale={1.06} transitionSpeed={2500}>
            <div className="tilt-scale h-full dark:bg-[rgba(30,41,59,.6)] bg-slate-100 rounded-md ">
                <div className='flex gap-3 px-6 py-5'>
                    <div className="avatar">
                        <div className="w-14 h-14 rounded-full">
                            <img src={profileImg} />
                        </div>
                    </div>
                    <div>
                        <p className='dark:text-slate-200 font-semibold mb-1'>{name}</p>
                        <Rating
                            style={{maxWidth: 100}}
                            value={rating}
                            readOnly
                        ></Rating>
                        <p className='dark:text-slate-200 text-sm mt-3'>{reviewDescription}</p>
                    </div>
                </div>
            </div>
        </Tilt>
    );
};

export default ReviewCard;