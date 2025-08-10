import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'



// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email}).select("+password")
        if(!user){
            return res.status(404).json({success: false, message: 'User not found'})
        } else{
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).json({success: false, message: 'Invalid credentials'})
            } else{
                const token = createToken(user._id)
                res.json({success: true, message: 'User logged in successfully', token})
            }
        }
    } catch (error) {
        console.error("Login error:", error)
        res.status(500).json({success: false, message: 'An unexpected error occurred.'})
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
            return res.status(409).json({success: false, message: 'User with this email already exists.'})
        }
        // validating email format and strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({success: false, message: 'Please enter a valid email.'})
        }

        if(!validator.isStrongPassword(password)){
            return res.status(400).json({success: false, message: 'Password is not strong enough. It must be at least 8 characters long and contain a mix of uppercase, lowercase, numbers, and symbols.'})
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
        res.json({success: true, message: 'User registered successfully', token})

    } catch(error){
        console.error("Registration error:", error)
        res.status(500).json({success: false, message: 'An unexpected error occurred.'})
    }
}



export {loginUser, registerUser}