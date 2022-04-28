import React from "react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import axiosPrivate from "../../api/axiosPrivate";

const OrderCheack = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getOrders = async () => {
      const email = user.email;
      const url = `https://arcane-springs-59725.herokuapp.com/orders?email=${email}`;
      console.log(url);
      try {
        const { data } = await axiosPrivate.get(url);
        setOrders(data);
      } catch (error) {
        console.log(error.message);
        if (error.response.status === 401 || error.response.status === 403) {
          signOut(auth);
          navigate("/login");
        }
      }
    };
    getOrders();
  }, []);
  return (
    <div>
      <h1>This is Your Order :{orders.length} </h1>
      {
        orders.map(order => <div key={orders._id}>
          <p>{order.email} ----{order.service}</p>
        </div>)
      }
    </div>
  );
};

export default OrderCheack;
