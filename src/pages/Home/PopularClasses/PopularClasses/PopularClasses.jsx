import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import sectionImg from '../../../../assets/images/section/popularClasses.png'
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import useCart from '../../../../hooks/useCart';
import useAdmin from '../../../../hooks/useAdmin';
import useInstructor from '../../../../hooks/useInstructor';

const PopularClasses = () => {
    const [classes, setClasses] = useState([]);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    const [, refetch] = useCart();

    const handleSelectClass = item => {
        if (user && user.email) {
            const { classImage, className, price, _id } = item;
            const cartItem = { selectedClassId: _id, classImage: classImage, className: className, price: price, email: user?.email }
            fetch('https://summer-camp-school-server-five.vercel.app/carts', {
                method: 'POST',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId){
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
        else {
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


    useEffect(() => {
        fetch('https://summer-camp-school-server-five.vercel.app/popular-classes')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, []);
    return (
        <div className='px-4 md:px-12'>
            <SectionTitle
                img={sectionImg}
                heading={`Popular Classes`}
                subHeading={"Browse popular classes around the world"}
            ></SectionTitle>
            <div className='grid md:grid-cols-3 grid-cols-1 justify-center items-center mx-auto gap-6'>
                {
                    classes.map(item => <div
                        key={item._id}
                        className='h-full'
                    >
                        <div className="card h-full dark:bg-[rgba(30,41,59,.6)] bg-slate-200 shadow-xl ">
                            <figure className="px-10 pt-10">
                                <img src={item.classImage} alt="Shoes" className="rounded-xl max-h-[240px]" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title dark:text-slate-200">{item.className}</h2>
                                <p className='dark:text-slate-400 font-bold'>Price : ${item.price}</p>
                                <div className="card-actions">
                                    <button onClick={() => handleSelectClass(item)}
                                        disabled={isAdmin ? true : isInstructor ? true : false} className="secondary-btn-filled disabled:disabled:text-slate-600">Select Now</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default PopularClasses;