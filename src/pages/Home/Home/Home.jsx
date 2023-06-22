import React from 'react';
import Banner from '../Banner/Banner';
import Reviews from '../Review/Reviews';
import PopularClasses from '../PopularClasses/PopularClasses/PopularClasses';
import PopularInstructor from '../PopularInstructor/PopularInstructor';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructor></PopularInstructor>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;