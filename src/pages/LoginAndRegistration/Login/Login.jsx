import { useForm } from 'react-hook-form';
import React, { useContext, useState } from 'react';
import imgLight from '../../../assets/images/login/LoginLight.gif'
import imgDark from '../../../assets/images/login/LoginDark.gif'
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { ThemeContext } from '../../../providers/ThemeProvider';

const Login = () => {
    const { dark } = useContext(ThemeContext);
    const { userLogin, googleSignIn } = useContext(AuthContext);

    const [err, setErr] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // handle form submit
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        userLogin(data.email, data.password)
            .then(() =>{
                setErr("");
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error.code)
                if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found"){
                    setErr("Wrong Email or Password! Please provide correct information.")
                }
            })

    };
    // login with google
    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {
                const loggedUser = result.user;
                const saveUser = { name: loggedUser.displayName, email: loggedUser.email };
                fetch('https://summer-camp-school-server-five.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Login Successful',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate(from, { replace: true });
                    })
            })
    }

    // password show button
    const [show, setShow] = useState(false);
    const handleShow = (e) => {
        e.preventDefault();
        setShow(!show);
    }
    return (
        <div className="hero min-h-screen dark:text-slate-50">
            <div className="hero-content w-full flex-col lg:flex-row">
                <div className='md:w-1/2'>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold">Login now!</h1>
                        <p className="py-6">Please do not share your login information with others.</p>
                    </div>
                    <div className="card shadow-2xl bg-base-100 dark:bg-[#172131] border-t-2">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control ">
                                <label className="label ">
                                    <span className="label-text dark:text-slate-300">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered text-slate-900" />
                                {errors.name && <span className="text-red-500">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text dark:text-slate-300">Password</span>
                                </label>
                                <div className="join">
                                    <input {...register("password", { required: true })} type={show ? "text" : "password"} placeholder="password" className="input input-bordered grow text-slate-900" />
                                    <button onClick={handleShow} className='btn btn-square'>{show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</button>
                                </div>
                                {errors.name && <span className="text-red-500">Password is required</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover dark:text-slate-300">Forgot password?</a>
                                </label>
                            </div>
                            <p className='text-red-500 font-semibold'>{err}</p>
                            <div className="form-control mt-6">
                                <input className={dark ? "primary-btn-filled" : "primary-btn-filled-light"} type="submit" value="Login" />
                            </div>
                        </form>
                        
                        <p className='text-center font-semibold'>New to Summer Bootcamp ? Please <Link to={`/registration`} className='underline hover:text-yellow-500'>Register</Link> or login in with </p>
                        <button onClick={handleGoogleLogin} className="btn btn-outline btn-warning mx-auto mt-5 mb-9"><FaGoogle className='text-2xl'></FaGoogle></button>
                    </div>
                </div>
                
                <div className='md:w-1/2'>
                    {
                        dark ? <img src={imgDark} alt="login" /> : <img src={imgLight} alt="login" />
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;