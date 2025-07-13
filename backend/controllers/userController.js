import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'



// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success: false, message: 'User not found'})
        } else{
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.json({success: false, message: 'Invalid password'})
            } else{
                const token = createToken(user._id)
                res.json({success: true, message: 'User logged in successfully', user, token})
            }
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'Error'})
    }
}

// create token
const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '3d'})
}

// register user
const registerUser = async (req, res) => {
    const {name, email, password} = req.body
    try{
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success: false, message: 'User already exists'})
        }
        // validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success: false, message: 'Invalid email format'})
        }
        if(password.length < 8){
            return res.json({success: false, message: 'Password must be at least 8 characters long'})
        }
        if(!validator.isStrongPassword(password)){
            return res.json({success: false, message: 'Password is not strong enough'})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success: true, message: 'User registered successfully', user, token})

    } catch(error){
        console.log(error)
        res.json({success: false, message: 'Error'})
    }
}



export {loginUser, registerUser}