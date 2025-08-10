import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const [data, setData] = useState([])
    const {url, token} = useContext(StoreContext)
    const [error, setError] = useState("");

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`${url}/api/order/user`, {headers: {token}})
            setData(Array.isArray(response.data.data) ? response.data.data : [])
            setError("");
        } catch (err) {
            setError("Failed to fetch orders.");
            setData([]);
        }
    }

    useEffect(() => {
        if(token){
            fetchOrder()
        }
    }, [token])


  return (
    <div  className='myorders'>
      <h2>My Orders</h2>
      {error && <div className="myorders-error">{error}</div>}
      <div className="container">
        {Array.isArray(data) && data.length > 0 ? data.map((order, index)=>{
            return (
                <div key={index} className='my-orders-order'>
                    <img src={assets.parcel_icon} alt="" />
                    <p>{order.items && order.items.map((item, idx) => {
                        if(idx === order.items.length-1){
                            return item.name+'x'+item.quantity
                        }else{
                            return item.name+'x'+item.quantity+', '
                        }
                    })}</p>
                    <p>${order.amount}.00</p>
                    <p>Items: {order.items ? order.items.length : 0}</p>
                    <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                    <button onClick={fetchOrder}>Track Order</button>
                </div>
            )
        }) : <p>No orders found.</p>}
      </div>
    </div>
    
  )
}

export default MyOrders
