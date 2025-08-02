import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing user order from frontend
const placeOrder = async (req, res) => {

    // Use environment variable for frontend URL for flexibility across environments
    const frontend_url = process.env.FRONTEND_URL || 'http://localhost:5173';
    const deliveryCharge = 2; // Example: 2 INR delivery charge

    try {
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
                // Stripe expects amount in the smallest currency unit (e.g., paise for INR)
                // The multiplication by 80 was likely a bug.
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

        res.json({ success: true, success_url: session.url })


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
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.user.id });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching your orders." });
    }
};

export { placeOrder, verifyOrder, userOrders };