import jwt from 'jsonwebtoken'


const authMiddleware = async (req, res, next) => {
    const {token} = req.headers
    if(!token){
        return res.json({success: false, message: 'No Authorized login again'})
    }
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = decodeToken.id
        next()
    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'Error'})
    }
}

export default authMiddleware