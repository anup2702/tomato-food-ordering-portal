import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify' 
import './List.css'

const List = ({url}) => {

    const [list, setList] = useState([])

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`)
            if(response.data.success){
                setList(response.data.data)
            } else {
                toast.error(response.data.message || 'Error fetching list')
            }
        } catch (error) {
            toast.error("An error occurred while fetching the list.")
            console.error("Fetch error:", error)
        }
    }

    const removeFood = async (foodId) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, {id: foodId});
            if (response.data.success) {
                toast.success(response.data.message || "Item removed successfully!");
                await fetchList(); 
            } else {
                toast.error(response.data.message || "Error removing item");
            }
        } catch (error) {
            toast.error("A server error occurred while removing the item.");
        }
    }

    useEffect(() => {
        fetchList()
    }, [])
    
  return (
    <div className='list add flex-col'>
      <p>All Food list</p>
      <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {list.map((item)=>{
            return (
                <div key={item._id} className='list-table-format'>
                    <img src={`${url}/images/${item.image}`} alt={item.name} />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>${item.price}</p>
                    <p onClick={() => removeFood(item._id)} className='cursor-pointer'>X</p>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default List
