import userModel from '../models/userModel.js';

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

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
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: 'An unexpected error occurred while adding the item to your cart.' });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const cartData = userData.cartData || {};

    const itemId = req.body.itemId;

    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: 'An unexpected error occurred while removing the item from your cart.' });
  }
};

// Get cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const cartData = userData?.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ success: false, message: 'An unexpected error occurred while loading your cart.' });
  }
};

export { addToCart, removeFromCart, getCart };
