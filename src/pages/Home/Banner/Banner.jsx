import React from 'react';

import bg1 from '../../../assets/images/banner/bg.svg'
import lbg1 from '../../../assets/images/banner/lightBg.svg'
import bg2 from '../../../assets/images/banner/bg2.svg'
import lbg2 from '../../../assets/images/banner/lightBg2.svg'
import bg3 from '../../../assets/images/banner/bg3.svg'
import lbg3 from '../../../assets/images/banner/lightBg3.svg'

import img1 from '../../../assets/images/banner/1.png'
import img2 from '../../../assets/images/banner/2.png'
import img3 from '../../../assets/images/banner/3.png'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Banner.css';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';
import { useRef } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../../providers/ThemeProvider';
import BannerItem from './BannerItem/BannerItem';


export default function App() {
    const {dark} = useContext(ThemeContext);



    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
                <SwiperSlide style={{ background: `url(${dark ? bg1 : lbg1})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                    <BannerItem 
                        heading={"Discover the Joy of Language Fluency"}
                    subHeading={"Unleash Your Linguistic Potential and Connect with the World"}
                    img={img1}
                    ></BannerItem>
                </SwiperSlide>
                <SwiperSlide style={{ background: `url(${dark ? bg2 : lbg2})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                    <BannerItem
                        heading={"Explore the Wonders of world"}
                        subHeading={"Embrace a World of Opportunities through Language Learning"}
                        img={img2}
                    ></BannerItem>
                </SwiperSlide>
                <SwiperSlide style={{ background: `url(${dark ? bg3 : lbg3})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                    <BannerItem
                        heading={"Unlock the World's Languages"}
                        subHeading={"Master New Languages with Fun and Effective Learning Methods"}
                        img={img3}
                    ></BannerItem>
                </SwiperSlide>
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </>
    );
}
