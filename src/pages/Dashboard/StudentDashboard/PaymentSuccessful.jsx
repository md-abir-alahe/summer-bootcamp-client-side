import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentSuccessful = () => {
    
    const {tranId} = useParams();
    return (
        <div className='flex flex-col'>
            <p className='text-green-500 text-center font-bold text-3xl '>Payment Successful</p>
            <p className='text-green-500 text-center font-bold text-3xl '>Your Transaction Id : {tranId}</p>
        </div>
    );
};

export default PaymentSuccessful;