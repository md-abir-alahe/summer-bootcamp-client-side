import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const [items, setItems] = useState([]);
    const [axiosSecure] = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/users')
            .then(data => {
                setItems(data.data)
            })
    }, []);

    const handleMakeAdmin = (item) => {
        axiosSecure.patch(`/users/set-admin/${item._id}`)
            .then(data => {
                if (data.data.modifiedCount) {
                    axiosSecure.get('/users')
                        .then(data => {
                            setItems(data.data)
                        })
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Make Admin successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleMakeInstructor = (item) => {
        axiosSecure.patch(`/users/set-instructor/${item._id}`)
            .then(data => {
                if (data.data.modifiedCount) {
                    axiosSecure.get('/users')
                        .then(data => {
                            setItems(data.data)
                        })
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Make Instructor successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    return (
        <div className='dark:text-slate-200'>
            <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
                <h3 className="text-3xl">Total Number of User: {items.length}</h3>
            </div>
            <div className="overflow-x-auto w-full border rounded-lg mt-5">
                <table className="table w-full ">
                    {/* head */}
                    <thead className='dark:text-slate-200'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
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
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                    {
                                        item.role === "admin" ?
                                            <div className="badge badge-success">admin</div>
                                            : item.role == "instructor" ?
                                                <div className="badge badge-warning ">instructor</div> : <div className="badge badge-info ">user</div>
                                    }
                                </td>
                                <td className='flex flex-col'>
                                    <button disabled={item.role === "admin" ? true : false} onClick={() => handleMakeAdmin(item)} className="btn btn-ghost disabled:text-slate-600 my-1 hover:bg-green-400 bg-green-600  text-white">Make Admin</button>
                                    <button disabled={item.role === "instructor" ? true : false} onClick={() => handleMakeInstructor(item)} className="btn btn-ghost disabled:text-slate-600 my-1 hover:bg-yellow-500 bg-yellow-600  text-white">Make Instructor</button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;