import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageClasses = () => {
    const [items, setItems] = useState([]);
    const [axiosSecure] = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/all-classes')
            .then(data => {
                setItems(data.data)
            })
    }, []);

    const handleApprove = (item) => {
        const newStatus = { status: "approved"}
        axiosSecure.patch(`/classes-status/${item._id}`, newStatus)
            .then(data => {
                if (data.data.modifiedCount) {
                    axiosSecure.get('/all-classes')
                        .then(data => {
                            setItems(data.data)
                        })
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Class approved successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleDeny = (item) => {
        const newStatus = { status: "denied"}
        axiosSecure.patch(`/classes-status/${item._id}`, newStatus)
            .then(data => {
                if (data.data.modifiedCount) {
                    axiosSecure.get('/all-classes')
                        .then(data => {
                            setItems(data.data)
                        })
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Class denied successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleFeedback = async (item) => {
        const { value: feedback } = await Swal.fire({
            title: 'Write Feedback',
            input: 'text',
            confirmButtonText: 'send',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something to send feedback!'
                }
            }
        })
        if (feedback) {
            const newFeedback = { feedback: feedback }
            axiosSecure.patch(`/classes-feedback/${item._id}`, newFeedback)
                .then(data => {
                    console.log(data.data)
                    if (data.data.modifiedCount) {
                        axiosSecure.get('/all-classes')
                            .then(data => {
                                setItems(data.data)
                            })
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Feedback sent successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }

        
    }



    // useEffect(() => {
    //     fetch(`https://summer-camp-school-server-five.vercel.app/all-classes`)
    //         .then(res => res.json())
    //         .then(data => console.log(data))
    // }, []);


    return (
        <div className='dark:text-slate-200'>
            <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
                <h3 className="text-3xl">Total Number of Class: {items.length}</h3>
            </div>
            <div className="overflow-x-auto w-full border rounded-lg mt-5">
                <table className="table w-full ">
                    {/* head */}
                    <thead className='dark:text-slate-200'>
                        <tr>
                            <th>#</th>
                            <th>class Image</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Instructor Email</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='dark:text-slate-300'>
                        {
                            items.map((item, index) => <tr
                                key={item._id}
                            >
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.classImage} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>{item.className}</td>
                                <td>{item.instructorName}</td>
                                <td>{item.instructorEmail}</td>
                                <td className="text-center">{item.availableSeats}</td>
                                <td className="text-center">${item.price}</td>
                                <td>
                                    {item.status === "approved" ?
                                    <div className="badge badge-accent">approved</div>
                                    : item.status == "pending" ?
                                    <div className="badge badge-primary">pending</div> : <div className='flex flex-col gap-1'><div className="badge badge-secondary">denied</div><br /><p className='dark:text-slate-300'>{item?.feedback}</p></div>}
                                </td>
                                <td>
                                    <button disabled={item.status === "approved" ? true : item.status === 'denied' ? true : false} onClick={() => handleApprove(item)} className="btn btn-ghost disabled:text-slate-600 w-full my-1 hover:bg-green-400 bg-green-600  text-white">Approve</button>
                                    <button disabled={item.status === "approved" ? true : item.status === 'denied' ? true : false} onClick={() => handleDeny(item)} className="btn btn-ghost disabled:text-slate-600 w-full my-1 hover:bg-red-400 bg-red-600  text-white">Deny</button>
                                    <button onClick={() => handleFeedback(item)} className="btn btn-ghost disabled:text-slate-600 w-full my-1 hover:bg-orange-400 bg-orange-600  text-white">Feedback</button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;