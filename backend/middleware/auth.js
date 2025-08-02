// auth.js
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config() 
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.token

    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' })
    }

    // Support for 'Bearer <token>' format or direct token
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { id: decoded.id }
        next()
    } catch (error) {
        console.error('JWT verification failed:', error.message)
        return res.status(403).json({ success: false, message: 'Invalid token signature' })
    }
}

export default authMiddleware
