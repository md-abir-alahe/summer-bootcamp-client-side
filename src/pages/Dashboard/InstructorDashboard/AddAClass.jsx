import { useForm } from 'react-hook-form';
import React from 'react';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { ThemeContext } from '../../../providers/ThemeProvider';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddAClass = () => {
    const { dark } = useContext(ThemeContext);
    const { user } = useContext(AuthContext);

    const [axiosSecure] = useAxiosSecure();


    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const className = form.className.value;
        const classImage = form.classImage.value;
        const instructorName = form.instructorName.value;
        const instructorEmail = form.instructorEmail.value;
        const availableSeats = parseInt(form.availableSeats.value);
        const price = parseInt(form.price.value);
        const studentNumber = 0;
        const status = "pending";
        const newClass = { className, classImage, instructorName, instructorEmail, availableSeats, price, studentNumber, status };
        axiosSecure.post('/classes', newClass)
        .then(data => {
            if(data.data.insertedId){
                form.reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Class added successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        
    }
    return (
        <div>
            <div className="text-center dark:text-slate-200 ">
                <h1 className="text-4xl font-bold mb-6">Add A Class</h1>
            </div>
            <div className="card shadow-2xl bg-base-100 dark:bg-[#172131] border-t-2">
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control ">
                        <label className="label ">
                            <span className="label-text dark:text-slate-300">Class Name</span>
                        </label>
                        <input name="className" type="text" placeholder="class name" className="input input-bordered text-slate-50  bg-slate-700" />
                    </div>
                    <div className="form-control ">
                        <label className="label ">
                            <span className="label-text dark:text-slate-300">Class Image</span>
                        </label>
                        <input name="classImage" type="text" placeholder="class image url" className="input input-bordered text-slate-50  bg-slate-700" />
                    </div>
                    <div className="form-control ">
                        <label className="label ">
                            <span className="label-text dark:text-slate-300">Instructor Name</span>
                        </label>
                        <input name="instructorName" type="text" defaultValue={user?.displayName} disabled className="input input-bordered text-slate-50  bg-slate-700 disabled:bg-slate-800 disabled:text-slate-500" />
                    </div>
                    <div className="form-control ">
                        <label className="label ">
                            <span className="label-text dark:text-slate-300">Instructor Email</span>
                        </label>
                        <input name="instructorEmail" type="email" defaultValue={user?.email} disabled className="input input-bordered text-slate-50  disabled:bg-slate-800 disabled:text-slate-500" />
                    </div>
                    <div className="form-control ">
                        <label className="label ">
                            <span className="label-text dark:text-slate-300">Available Seats</span>
                        </label>
                        <input name="availableSeats" type="number" placeholder="available seats" className="input input-bordered text-slate-50  bg-slate-700" />
                    </div>
                    <div className="form-control ">
                        <label className="label ">
                            <span className="label-text dark:text-slate-300">Price</span>
                        </label>
                        <input name="price" type="number" placeholder="price" className="input input-bordered text-slate-50  bg-slate-700" />
                    </div>
                    <div className="form-control mt-6">
                        <input className={dark ? "primary-btn-filled" : "primary-btn-filled-light"} type="submit" value="Add Class" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAClass;