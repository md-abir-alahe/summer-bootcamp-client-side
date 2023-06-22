import React, { useContext } from 'react';
import useCart from '../../../hooks/useCart';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaWallet } from 'react-icons/fa';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MySelectedClass = () => {
    const [cart, refetch] = useCart();
    const { user } = useContext(AuthContext);

    const [axiosSecure] = useAxiosSecure();

    const handlePay = (item) => {
        const paymentData = { cartId: item._id, email: user.email }
        axiosSecure.post('/payment', paymentData)
        .then(data => {
            // console.log(data.data)
            window.location.replace(data.data.url)
        })
    }

    const total = cart.reduce((sum, item) => item.price + sum, 0);

    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://summer-camp-school-server-five.vercel.app/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <div className='dark:text-slate-200'>
            <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
                <h3 className="text-3xl">Total Selected Class: {cart.length}</h3>
                <h3 className="text-3xl">Total Price: ${total}</h3>
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
                            <th>Action</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody className='dark:text-slate-300'>
                        {
                            cart.map((item, index) => <tr
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
                                <td className="text-end">${item.price}</td>
                                <td>
                                    <button onClick={() => handleDelete(item)} className="btn btn-ghost bg-red-600  text-white"><FaTrashAlt></FaTrashAlt></button>
                                </td>
                                <td>
                                    <button onClick={() => handlePay(item)} className="btn btn-ghost bg-green-600  text-white"><FaWallet></FaWallet></button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySelectedClass;