import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder, verifyOrder, userOrder, listOrders, updateOrderStatus } from '../controllers/orderController.js'


const orderRoute = express.Router()

orderRoute.post('/place', authMiddleware, placeOrder)
orderRoute.post('/verify', verifyOrder)
orderRoute.get('/user', authMiddleware, userOrder)
orderRoute.get('/list', listOrders)
orderRoute.post('/status', updateOrderStatus)



export default orderRoute