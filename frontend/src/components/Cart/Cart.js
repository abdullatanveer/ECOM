import React from 'react';
import './Cart.css';
import './CartItemCard.js'
import CartItemCard from './CartItemCard.js';
import { useSelector,useDispatch } from 'react-redux';
import { RemoveItemFromCart, addItemsToCart } from '../../actions/cartActions';
import { useAlert } from 'react-alert';
import RemoveShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import { useNavigate } from 'react-router-dom';
  
 
const Cart = () => {
    const {cartItems}=useSelector((state) =>state.cart || {});
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();
     
    // const item={
    //     product:"Product1",
    //     name:"ABC",
    //     price:"200",
    //     quantity:2,
    // }
   // increase 
    const increaseQuantity = (id, quantity, stock) => {
      const newQty = quantity + 1;
      if (stock <= quantity) {
        return;
      }
      dispatch(addItemsToCart(id, newQty));
    };
   
    //decrease
    const decreaseQuantity = (id, quantity) => {
      const newQty = quantity - 1;
      if (quantity <=1) {
        return;
      }
      dispatch(addItemsToCart(id, newQty));
    };

    //delete from cart
    const deleteFromCart =(id)=>{
      dispatch(RemoveItemFromCart(id));
      alert.success("ITEM REMOVED");
    }
// checkout
    const checkoutHandler = () => {
      navigate("/login?redirect=shipping");
    };
    
    
     
  return (
   <>
   {cartItems.length===0 ?  (
   <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
        ):
   
    <>
    <div className="cartPage">
        <div className="cartHeader">
            <p>Products</p>
            <p>Quantity</p>
            <p>total</p>
        </div>
        {cartItems && 
         cartItems.map((item)=>(
            <div className="cartContainer" key={item.product}>
            <CartItemCard item={item} deleteFromCart={deleteFromCart}  />
            <div className="cartInput">
              <button onClick={()=>decreaseQuantity(item.product,item.quantity)}> - </button>
              <input type="number" value={item.quantity} readOnly />
              
              <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)} >+</button>
            </div>
            <p className="cartSubtotal">{`$${
              item.price * item.quantity
            }`}</p>
          </div>
          
           
          
          
        ))}
              
         <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>GrossTotal</p>
                <p>{`$${cartItems.reduce((total,item)=>(
                  total+ item.quantity *item.price
                ),0)}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div> 
            
            
        </div>
     
    </>
   }
   
   </>
  )
}

export default Cart;