import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({ ...data, [name]: value }));
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    let orderItems = []
    food_list.map((item)=>{
      if(cartItems[item._id] > 0){
        let itemInfor = item;
        itemInfor.quantity = cartItems[item._id]
        orderItems.push(itemInfor)
      }
    })
    // console.log(orderItems)
    let orderData = {
      address:data,
      items:orderItems,
      amount: getTotalCartAmount()+2,
    }

    let respose = await axios.post(url + '/api/order/place', orderData, {headers: {token}})
    if(respose.data.success){
      const {session_url} = respose.data
      window.location.href = session_url
    }else{
      alert(respose.data.message)
    }
  }

  const navigate = useNavigate();

  return (
    <>
      <form onSubmit={placeOrder} action="" className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
            <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
          </div>
          <input required name="email" onChange={onChangeHandler} value={data.email} className="email" type="email" placeholder="Email address" />
          <input required name="street" onChange={onChangeHandler} value={data.street} className="email" type="text" placeholder="Street" />
          <div className="multi-fields">
            <input required name="city" onChange={onChangeHandler} value={data.city} className="email" type="text" placeholder="City" />
            <input required name="state" onChange={onChangeHandler} value={data.state} className="email" type="text" placeholder="State" />
          </div>
          <div className="multi-fields">
            <input required name="zipCode" onChange={onChangeHandler} value={data.zipCode} type="number" placeholder="Zip code" />
            <input required name="country" onChange={onChangeHandler} value={data.country} className="email" type="text" placeholder="Country" />
          </div>
          <input required name="phone" onChange={onChangeHandler} value={data.phone} className="email" type="number" placeholder="Phone" />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery</p>
                <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>${getTotalCartAmount()===0?0:getTotalCartAmount() + 2}</p>
              </div>
              <button type="submit" onClick={() => navigate("/order")}>
                Procede to CheckOut
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
