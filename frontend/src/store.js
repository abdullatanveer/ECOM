import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailReducer,
  productReducer,
} from "./reducers/productReducer";
import { userReducer,allUsersReducer,userDetailsReducer } from "./reducers/userReducer";
import { profileReducer, forgotPassReducer } from "./reducers/profileReducer";
import { cartReducer } from "./reducers/cartReducer";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer ,allOrdersReducer,orderReducer} from "./reducers/orderReducer";
import { newReviewReducer,productReviewsReducer,reviewReducer } from "./reducers/reviewReducer";
import { getAdminProducts,  createProduct} from "./actions/productActions";
 

const reducer = combineReducers({
  products: productsReducer,
  productDetail: productDetailReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPassReducer,
  cart: cartReducer,
  newOrder:newOrderReducer,
  myOrders:myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview:newReviewReducer,
  adminProducts:getAdminProducts,
  newProduct:createProduct,
  product:productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,

});

// Remove the duplicated import and use applyMiddleware directly
const middleWare = [thunk];

let initialState = {
    cart:{
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      
    shippingInfo: localStorage.getItem("shippingIInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : [],
    }
  
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
