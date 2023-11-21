import React from 'react';
import { Link } from 'react-router-dom';

export const PaymentSuccess = () => {
    // Cambiar Bills.status a "Paid"

    return (
        <div className="text-center mt-5">
            <h1 className='py-5'>Thanks for your purchase!</h1>
            <div className="my-5 py-5">
                <Link to="/">
                    <button className="btn btn-warning">
                        Home
                    </button>
                </Link>
            </div>

        </div>
    )
}