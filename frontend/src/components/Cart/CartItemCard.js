import React from 'react'
import { Link } from 'react-router-dom';
import './CartItemCard.css'
 

const CartItemCard = ({item,deleteFromCart}) => {
  return (
     <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
         <Link to={`/product/${item.product}`}>{item.name}</Link>
         <span>{`Price : RS ${item.price}`}</span>
         <p onClick={()=>deleteFromCart(item.product)}>Remove</p>
      </div>
     </div>
  )
}

export default CartItemCard