import { subtle } from "crypto"
import foodModel from "../models/foodModel.js"
import fs from 'fs'


// add food items
const addFoodItems = async(req, res) => {
    let img_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: img_filename,
        category: req.body.category,
    })

    try{
        await food.save()
        res.json({success:true , message: 'Food item added successfully'})
    } catch (error){
        console.log(error)
        res.json({success:false, message: 'Failed to add food item'})
    }
}


// get all food items

const listFoodItems = async (req, res) => {
    try{
        const foods = await foodModel.find({});
        res.json({success:true, data: foods})
    } catch(error){
        console.log(error)
        res.json({success:false, message: 'Failed to fetch food items'})
    }
}

// remove food items

const removeFoodItems = async (req, res) => {
    try{
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, ()=>{})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: 'food removed'})
    } catch(error){
        console.log(error)
        res.json({success: false, message: 'Error'})
    }
}


export {addFoodItems, listFoodItems, removeFoodItems}
