import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";
import { FaBeer,FaSearch } from 'react-icons/fa';
import {useSelector} from 'react-redux';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";



const Header = () => {
  const {cartItems} =useSelector( state =>state.cart);
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
 
  return (
    <nav className="navbar">
    <Link to="/" className="navbar-logo">
      Tap n Hire
    </Link>
    {/* <h1 className='navbar-logo'>Tap N Hire</h1> */}
    <ul className="navbar-links">
      <li className="navbar-link">
        <Link to="/products">Products</Link>
      </li>
      <li className="navbar-link">
        <Link to="/about">About</Link>
      </li>
      <li className="navbar-link">
        <Link to="/search">
          <FaSearch/>
        </Link>
      </li>
      <li className="navbar-link">
      <Link to="/cart" className='cart-link'>
            <ShoppingCartIcon />
            {cartQuantity >0 &&
            
            <span className='CartQuantity'>{cartQuantity}</span>}
            
          </Link>
         
      </li>
      <li className="navbar-link">
        <Link to="/login"><FaBeer/></Link>
      </li>
    </ul>
  </nav>
  );
};
export default Header;  