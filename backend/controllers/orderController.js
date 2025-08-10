import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing user order from frontend
const placeOrder = async (req, res) => {

    const frontend_url = process.env.FRONTEND_URL || 'http://localhost:5173';
    const deliveryCharge = 2;

    try {
        if (!req.body.items || req.body.items.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty." });
        }
        const newOrder = new orderModel({
            // Use user ID from auth middleware for security
            userId: req.user.id,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save()
        // Clear user's cart after placing order
        await userModel.findByIdAndUpdate(req.user.id, { cartData: {} })

        const lineItems = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity
        }))

        lineItems.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: 'An unexpected error occurred while placing your order.' })
    }
}

// To verify order after payment redirection
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment successful." });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed." });
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        res.status(500).json({ success: false, message: "An error occurred while verifying the payment." });
    }
};

// To list all orders for a user
const userOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.user.id });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching your orders." });
    }
};


// Listing order for admin panel
const listOrders = async (req, res) => {
    try{
        const order = await orderModel.find({})
        res.json({ success: true, data: order })
    } catch ( error){
        console.error("Error listing orders:", error)
        res.status(500).json({ success: false, message: 'An error occurred while fetching orders.' })
    }
}

// update order status by admin
const updateOrderStatus = async (req, res) => {
    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: "Order status updated successfully." })
    }
    catch (error) {
        console.error("Error updating order status:", error);
        res.json({ success: false, message: "An error occurred while updating the order status." });
    }
}

export { placeOrder, verifyOrder, userOrder, listOrders, updateOrderStatus };