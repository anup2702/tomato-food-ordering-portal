import userModel from '../models/userModel.js';

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};

    const itemId = req.body.itemId;

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: 'Item added to cart' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error adding item to cart' });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};

    const itemId = req.body.itemId;

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error removing item from cart' });
  }
};

// Get cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await userModel.findById(userId);
    const cartData = userData?.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error loading cart' });
  }
};

export { addToCart, removeFromCart, getCart };
