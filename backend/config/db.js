import mongoose from "mongoose"


export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://anup2702:anup2702@cluster0.lxxnr8o.mongodb.net/food-del').then(() => {
        console.log('db connected')
    })
}