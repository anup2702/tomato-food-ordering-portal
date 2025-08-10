import React from "react";
import "./Order.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { assets } from "../../assets/assets"

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.status === 200) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Failed to fetch orders");
    }
  };

  const statusHandler = async (orderId, e) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId: orderId,
      status: e.target.value
    })
    if(response.data.success){
      await fetchAllOrders();
    } else {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, idx) =>
                  idx === order.items.length - 1
                    ? item.name + "x" + item.quantity
                    : item.name + "x" + item.quantity + ", "
                )}
              </p>
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="order-item-address">
                {order.address.street},<br />
                {order.address.city}, {order.address.state}
              </p>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(e) => statusHandler(order._id, e)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Out for delivery">Out for delivery</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
