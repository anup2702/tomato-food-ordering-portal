import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';


const Add = ({url}) => {

    const [image, setImage] = useState(false)
    const [itemDetails, setItemDetails] = useState({
        name: "",
        desc: "",
        price: "",
        category: "Salad"
    })

    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setItemDetails(itemDetails => ({ ...itemDetails, [name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", itemDetails.name)
        formData.append("description", itemDetails.desc)
        formData.append("price", Number(itemDetails.price))
        formData.append("category", itemDetails.category)
        formData.append("image", image)

        const response = await axios.post(`${url}/api/food/add`, formData)
        if(response.data.success){
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message)
        }
    }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
            <p>Product Name</p>
            <input onChange={onChangeHandler} value={itemDetails.name} type="text" placeholder='Type Here' name="name" id="" />
        </div>
        <div className="add-product-desc flex-col">
            <p>Description</p>
            <textarea name='desc' onChange={onChangeHandler} value={itemDetails.desc}  type="text" placeholder='Desc Here'/>
        </div>
        <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Product Category</p>
                <select onChange={onChangeHandler} value={itemDetails.category} name="category" >
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodle">Noodle</option>
                </select>
            </div>
            <div className="add-price flex-col">
                <p>Product Price</p>
                <input  onChange={onChangeHandler} value={itemDetails.price}  type="number" name='price' placeholder='Price' />
            </div>
        </div>
        <button type='submit' className='add-btn'>Add Product</button>
      </form>
    </div>
  )
}

export default Add
