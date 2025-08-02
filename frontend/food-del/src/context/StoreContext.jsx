import { createContext, useEffect, useState } from "react";
import axios from "axios";

const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItem] = useState(() => {
    const localCart = localStorage.getItem('cart');
    return localCart ? JSON.parse(localCart) : {};
  });
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error adding to cart:", error);
        // Optionally revert state or show a toast message
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error removing from cart:", error);
        // Optionally revert state or show a toast message
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
  try {
    const response = await axios.post(url+'/api/cart/get', {}, {headers:{token}});
    const rawCart = response.data.cartData;

    const cleanedCart = {};
    for (const key in rawCart) {
      if (rawCart[key] > 0) {
        cleanedCart[key] = rawCart[key];
      }
    }

    setCartItem(cleanedCart);
  } catch (error) {
    console.error("Error loading cart data:", error);
  }
};


  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        // Optimistic UI: keep showing local cart until backend responds
        const response = await axios.post(url + '/api/cart/get', {}, { headers: { token: storedToken } });
        const rawCart = response.data.cartData;
        const cleanedCart = {};
        for (const key in rawCart) {
          if (rawCart[key] > 0) {
            cleanedCart[key] = rawCart[key];
          }
        }
        // Only update if backend cart is not empty
        if (Object.keys(cleanedCart).length > 0) {
          setCartItem(cleanedCart);
        }
      }
    }
    loadData();
  }, []);

  // Save cart to localStorage whenever it changes, if user is not logged in
  useEffect(() => {
    if (!token) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, token]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export { StoreContext };
export default StoreContextProvider;
