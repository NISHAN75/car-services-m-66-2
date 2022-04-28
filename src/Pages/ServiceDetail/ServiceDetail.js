import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useServicesDetails from '../../hooks/useServicesDetails';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const [service,setService]=useServicesDetails(serviceId)


    return (
        <div className='text-center'>
            <h2 className='mt-5 mb-5' >You are about to Book :{service.name}</h2>
            <div className='text-center'>
                <Link to={`/checkout/${serviceId}`}>
                    <button className='btn btn-primary'>Proceed Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetail;