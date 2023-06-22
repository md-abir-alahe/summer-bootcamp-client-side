import React from 'react';
import {  FaSortAmountUp } from 'react-icons/fa';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyClasses = () => {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);

    const [axiosSecure] = useAxiosSecure();

    useEffect(() => {
        fetch(`https://summer-camp-school-server-five.vercel.app/my-classes?email=${user.email}`)
            .then(res => res.json())
            .then(data => setItems(data))
    }, []);

    const handleUpdate = async (item) => {
        const { value: formValues } = await Swal.fire({
            title: 'Update Class Information',
            html:
                '<p>Class Name</p>'+
                `<input id="swal-input1" type="text" value="${item.className}" class="swal2-input">` +
                '<p>Class Image</p>'+
                `<input id="swal-input2" type="text" value="${item.classImage}" class="swal2-input">` +
                '<p>Available Seats</p>' +
                `<input id="swal-input3" type="number" value="${item.availableSeats}" class="swal2-input">` +
                '<p>Price</p>' +
                `<input id="swal-input4" type="number" value="${item.price}" class="swal2-input">`,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value,
                    document.getElementById('swal-input3').value,
                    document.getElementById('swal-input4').value,
                ]
            }
        })
        if (formValues) {
            const className = formValues[0];
            const classImage = formValues[1];
            const availableSeats = formValues[2];
            const price = formValues[3];
            const updatedClass = { className, classImage, availableSeats, price };
            axiosSecure.patch(`/classes/${item._id}`, updatedClass)
                .then(data => {
                    if (data.data.modifiedCount) {
                        axiosSecure.get(`my-classes?email=${user.email}`)
                            .then(data => {
                                setItems(data.data)
                            })
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Updated successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
            
        }
    }

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
                            <th>Price</th>
                            <th>Students</th>
                            <th>Status</th>
                            <th>Update</th>
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
                                <td>
                                    {item.className}
                                </td>
                                <td className="text-center">${item.price}</td>
                                <td className="text-center">{item.studentNumber}</td>
                                <td>
                                    {
                                        item.status === "approved" ? 
                                            <div className="badge badge-accent">approved</div> 
                                            : item.status == "pending" ? 
                                                <div className="badge badge-primary">pending</div> : <div className='flex flex-col gap-1'><div className="badge badge-secondary">denied</div><br /><p className='dark:text-slate-300'>{item?.feedback}</p></div>

                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleUpdate(item)} className="btn btn-ghost bg-orange-600  text-white"><FaSortAmountUp></FaSortAmountUp></button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClasses;