import React, { useEffect } from 'react';
import { useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import sectionImg from '../../../assets/images/section/review.png'
import ReviewCard from './ReviewCard/ReviewCard';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`https://summer-camp-school-server-five.vercel.app/reviews`)
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);

    return (
        <div className='mb-20'>
            <SectionTitle
                img={sectionImg}
                heading={`Learner's opinions about the courses`}
                subHeading={"Learners have always expressed their love for Summer Bootcamp"}
            ></SectionTitle>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-4 p-4 items-stretch '>
                {
                    reviews.map(review => <ReviewCard key={review._id} review={review}></ReviewCard>)
                }
            </div>
        </div>
    );
};

export default Reviews;