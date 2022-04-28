import React from 'react';
import { useParams } from 'react-router-dom';
import useServicesDetails from '../../../hooks/useServicesDetails';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init'
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const {serviceId}= useParams();
    const [service]=useServicesDetails(serviceId);
    const [user] = useAuthState(auth);

    if(user){
        console.log(user)
    }
    const handleOrder= event=>{
        event.preventDefault();

        const order={
            email:user.email,
            service:service.name,
            serviceId:serviceId,
            address:event.target.address.value,
            phone:event.target.phone.value
        }
        
        // axios use
        axios.post('http://localhost:5000/order',order)
        .then(response => {
            const {data}= response;
            if(data.insertedId){
                toast('Your Order is Booking Successful'); 
                event.target.reset();
            }
        })
    }

    return (
        <div className='mx-auto w-50 mt-5 text-center'>
            <h2>Please Order:{service.name}</h2>

            <form onSubmit={handleOrder}>
                <input className="w-100 mb-2"  type="text" value={user?.displayName} name="name" placeholder="Enter Your name" id="" required readOnly disabled />
                <br/>
                <input className="w-100 mb-2" type="email" value={user?.email} name="email" placeholder="Enter Your email" id=""  required readOnly disabled />
                <br/>
                <input className="w-100 mb-2" value={service.name} type="text" name="service" placeholder="Enter Your service" id="" required readOnly disabled />
                <br/>
                <input className="w-100 mb-2" type="text" name="address" placeholder="Enter Your address" id="" />
                <br/>
                <input className="w-100 mb-2" type="number" name="phone" placeholder="Enter Your phone number" id="" />
                <br/>
                <input className="mt-2 btn btn-primary" type="submit"  value="Please Order" id="" />
                <br/>
            </form>
        </div>
    );
};

export default Checkout;