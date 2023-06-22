import React, { useContext, useState } from 'react';
import imgLight from '../../../assets/images/signup/SignupLight.gif';
import imgDark from '../../../assets/images/signup/SignupDark.gif';
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { ThemeContext } from '../../../providers/ThemeProvider';

const Registration = () => {
    const { dark } = useContext(ThemeContext);
    const { userRegistration, googleSignIn, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const [err, setErr] = useState("");

    // handle form submit
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        userRegistration(data.email, data.password)
            .then(() => {
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email }
                        fetch('https://summer-camp-school-server-five.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    setErr("")
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Registration Successful',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    navigate('/');
                                }
                            })
                    })
            })
            .catch(error => {
                if (error.code === "auth/email-already-in-use"){
                    setErr("Email already exist in our database !")
                }
                if (error.code === "Photo URL too long"){
                    setErr("Photo URL too long. Please provide a short url.")
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
                        navigate('/');
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
                        <h1 className="text-4xl font-bold">Please Register!</h1>
                        <p className="py-6">Please keep your registration information secret.</p>
                    </div>
                    <div className="card shadow-2xl bg-base-100 dark:bg-[#172131] border-t-2">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control ">
                                <label className="label ">
                                    <span className="label-text dark:text-slate-300">Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="text" placeholder="name" className="input input-bordered text-slate-900" />
                                {errors.name && <span className="text-red-500">Name is required</span>}
                            </div>
                            <div className="form-control ">
                                <label className="label ">
                                    <span className="label-text dark:text-slate-300">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered text-slate-900" />
                                {errors.email && <span className="text-red-500">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text dark:text-slate-300">Password</span>
                                </label>
                                <div className="join">
                                    <input {...register("password", { minLength: 6, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z])/, required: true })} type={show ? "text" : "password"} placeholder="password" className="input input-bordered grow text-slate-900" />
                                    <button onClick={handleShow} className='btn btn-square'>{show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</button>
                                </div>
                                {errors.password?.type === 'required' && <span className="text-red-500">Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-500">Password must have at least 6 characters.</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-500">Password must have at least one capital letter and one special character.</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text dark:text-slate-300">Confirm password</span>
                                </label>
                                <div className="join">
                                    <input {...register("confirmPassword", {
                                        required: 'Confirm Password is required',
                                        validate: (value) => value === watch('password') || 'Password and Confirm Password do not match.'
                                    })} type={show ? "text" : "password"} placeholder="confirm password" className="input input-bordered grow text-slate-900" />
                                    <button onClick={handleShow} className='btn btn-square'>{show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</button>
                                </div>
                                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                            </div>
                            <div className="form-control ">
                                <label className="label ">
                                    <span className="label-text dark:text-slate-300">Photo URL</span>
                                </label>
                                <input {...register("photoURL", { required: true })} type="text" placeholder="photo url" className="input input-bordered text-slate-900" />
                                {errors.photoURL && <span className="text-red-500">Photo URL is required</span>}
                            </div>
                            <p className='text-red-500 font-semibold'>{err}</p>
                            <div className="form-control mt-6">
                                <input className={dark ? "primary-btn-filled" : "primary-btn-filled-light"} type="submit" value="Register" />
                            </div>
                        </form>
                        <p className='text-center font-semibold'>Already have an account ? Please <Link to={`/login`} className='underline hover:text-yellow-500'>Login</Link> or login in with </p>
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

export default Registration;