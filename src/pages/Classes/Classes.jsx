import React, { useContext  } from 'react';
import sectionImg from '../../assets/images/section/popularClasses.png'
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import {  useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useCart from '../../hooks/useCart';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';

const Classes = () => {
    const classes = useLoaderData();
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    const [, refetch] = useCart();

    const handleSelectClass = item => {
        if(user && user.email){
            const { classImage, className, price, _id } = item;
            const cartItem = { selectedClassId: _id, classImage: classImage, className: className, price: price, email: user?.email }
            fetch('https://summer-camp-school-server-five.vercel.app/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Class selected successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else{
            Swal.fire({
                title: 'Please login to select classes.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    // TODO: Check admin
    
    return (
        <div className='min-h-screen px-4 md:px-12 mt-10 mb-12'>
            <SectionTitle
                img={sectionImg}
                heading={`Classes`}
                subHeading={"Learn without Limit"}
            ></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {
                    classes.map(item => <div
                        key={item._id}
                        className={item.availableSeats == 0 ? "card card-compact bg-red-400 shadow-xl" : "card card-compact dark:bg-[rgba(30,41,59,.6)] bg-base-100 shadow-xl border-b-2 dark:border-slate-700"}>
                        <figure ><img className='max-h-[250px] w-full' src={item.classImage} alt="Shoes " /></figure>
                        <div className="card-body">
                            <h2 className="card-title dark:text-slate-50 text-2xl font-bold">{item.className}</h2>
                            <div className='dark:text-slate-300 md:text-lg font-semibold ps-3 border-s-2'>
                                <p >Instructor Name : {item.instructorName}</p>
                                <p >Available Seats : {item.availableSeats}</p>
                                <p >Price : $ {item.price}</p>
                            </div>
                            <div className="card-actions justify-end">
                                    <button onClick={() => handleSelectClass(item)} disabled={item.availableSeats == 0 ? true : isAdmin ? true : isInstructor ? true : false} className="secondary-btn-filled disabled:text-slate-600">Select Now</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Classes;