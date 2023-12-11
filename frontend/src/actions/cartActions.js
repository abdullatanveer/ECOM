 
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  RESET_CART,
  SAVE_SHIPPING_INFO,
  
} from "../constants/cartConstants";
import axios from "axios";

const baseUrl = "http://localhost:3001";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`${baseUrl}/api/v1/product/${id}`);
  
try{
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product:data.product._id, 
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
     
  });
  

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}
catch(error){
  console.log("Error fetchening dtat" ,error)
}
};

// Remove from cart
export const RemoveItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type:REMOVE_FROM_CART,
    payload:id,
})
localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}

// Reset cart after logout

export const ResetCart = () => async (dispatch,getState) => {
  dispatch({
    type:RESET_CART,
   
})
localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type:SAVE_SHIPPING_INFO,
    payload:data,
   
})
localStorage.setItem("shippingInfo", JSON.stringify(data));

}



 
 