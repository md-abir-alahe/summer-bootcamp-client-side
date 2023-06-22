import React, { useContext } from 'react';
import logo from '../../../assets/images/logo/websiteLogo.png'
import logoLight from '../../../assets/images/logo/websiteLogoLight.png'
import { ThemeContext } from '../../../providers/themeProvider';
import { FaEnvelope, FaFacebook, FaGoogle, FaInstagram, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Footer = () => {
    const {dark} = useContext(ThemeContext);
    return (
        <div>
            <footer className="footer p-10 border-t border-slate-600 bg-base-200 text-base-content font-semibold text-base dark:bg-gradient-to-r from-[#0F1629] to-[#0B1120] dark:text-slate-300">
                <div>
                    {
                        dark ? <img src={logo} alt="" /> : <img src={logoLight} alt="" />
                    }
                    <p className='flex gap-2 justify-center items-center mt-3'><FaMapMarkerAlt></FaMapMarkerAlt> Level-5, 36, MuktoBangla Complex, Mirpur-1, Dhaka</p>
                    <p className='flex gap-2 justify-center items-center'><FaEnvelope></FaEnvelope> Support: support@summerbootcamp.com</p>
                    <p className='flex gap-2 justify-center items-center'><FaPhone></FaPhone> +880 17XXXXXXXX (Available: 10:00am to 07:00pm)</p>
                </div>
                <div>
                    <span className="footer-title">Services</span> 
                    <a className="link link-hover">Home</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </div>
                <div>
                    <span className="footer-title">Social</span>
                    <div className="grid grid-flow-col gap-4 text-2xl ">
                        <a><FaFacebook></FaFacebook></a>
                        <a><FaGoogle></FaGoogle></a>
                        <a><FaInstagram></FaInstagram></a>
                    </div>
                </div>
            </footer>
            <footer className="footer px-10 py-4 border-dotted border-t-[1px]  bg-base-200 text-base-content border-t-slate-700 justify-center dark:bg-gradient-to-r from-[#0F1629] to-[#0B1120] dark:text-slate-300">
                <div>
                    <p className='text-sm font-medium'>Copyright © 2023 - All right reserved by Summer Bootcamp</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;