import React, { useState,useEffect,useRef} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import webfont from 'webfontloader';
// import axios from "axios";
// import Cookies from 'js-cookie';
 
 
import { loadUser } from './actions/userActions';
import store from './store';

import Header from './components/layouts/Header/Header.js';
import NavbarWrapper from "./components/layouts/Header/NavbarWrapper";
import Footer from "./components/layouts/Footer/Footer";
import Home from "./components/Home/Home";
import About from "./components/Home/About";
import Profile from './components/User/Profile.js';
import ProductDetail from './components/Product/ProductDetail';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignup from './components/User/LoginSignUp';
import UserOptions from './components/layouts/Header/UserOptions'
import {useSelector} from 'react-redux';
import ProtectedRoutes from "./components/User/Route/ProtectedRoutes";
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from "./components/Cart/Cart";
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment'; 
import OrderSuccess from './components/Cart/OrderSuccess'
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails'
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from './components/Admin/NewProduct';
import  OrderList from './components/Admin/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder.js'
import UserList from './components/Admin/UserList.js';
import UpdateProduct from "./components/Admin/UpdateProduct";
import UpdateUser from "./components/Admin/UpdateUser.js";
import ProductReviews from './components/Admin/ProductReviews.js';
import TicketManagement from "./components/TicketManagement/TicketManagement";



import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';
 
 
 

 const baseUrl = "http://localhost:3001";


function App() {
  const {isAuthenticated,user}=useSelector(state=> state.user);  
  const stripeApiKey ="pk_test_51Nd6A8IQ2ZA9ryOaBhAxzTxTgUqdl8SK1zCau9wQEomFU2lAuGOzngObUF01YyqAe6xkrTPOolGxj37cLkhdknYW00QA8Jo4xu"
 
  

  // const getStripeKey= async()=> {
  //   try{
  
  //     const response = await axios.get(`${baseUrl}/api/v1/stripeapikey`)
        
  //     const { data } = response;
  //       // Check if data is received
  //     setstripeApiKey(data.stripeApiKey);
  //     console.log('Stripe API Key Data:', data);
  //   } catch (error) {
  //     console.error('Error fetching Stripe key:', error);
  //   }
  // }
  
  useEffect(() => {
    webfont.load({
      google: {
        families: ['Roboto', 'Droid sans', 'Chilanka']
      }
    });
    store.dispatch(loadUser());

     
    // getStripeKey();
    //  // Listen for changes to the Stripe API key state variable
    // stripeApiKeyRef.current = stripeApiKey;
    // stripeApiKeyRef.current.subscribe(key => {
    //   // If the Stripe API key is not empty, initialize Stripe
    //   if (key !== "") {
    //     loadStripe(key);
    //   }
    // });
    
  }, []);
  
   
    

   
  return (
    <Router>
      <NavbarWrapper/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
         
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
         
      {/*Protected Routes */}
        <Route element={<ProtectedRoutes/>}>
        <Route path="/account" element={<Profile/>} />
        <Route path="/me/updateProfile" element={<UpdateProfile/>} />
        <Route path="/me/password/update" element={<UpdatePassword/>} />
        <Route path="/login/shipping" element={<Shipping/>} />
        <Route path="/order/confirm" element={<ConfirmOrder/>} />
        <Route path="/success" element={<OrderSuccess/>}/>
        <Route path="/orders/me" element={<MyOrders/>}/>
        <Route path="/order/:id" element={<OrderDetails/>}/>
        <Route path="/TicketManagement" element={<TicketManagement/>}/>
        
           <Route
           path="/process/payment"
           element={(
             <Elements stripe={loadStripe(stripeApiKey)}>
               <Payment />
             </Elements>
           )}
     />  
   {/*   ADMIN ROUTES */}
    
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/products" element={<ProductList/>}/>
        <Route path="/admin/products/new" element={<NewProduct/>}/>
        <Route path="/admin/products/:id" element={<UpdateProduct/>}/>
        <Route path="/admin/orders" element={<OrderList/>}/>
        <Route path="/admin/order/:id" element={<ProcessOrder/>}/>
        <Route path="/admin/users" element={<UserList/>}/>
        <Route path="/admin/user/:id" element={<UpdateUser/>}/>
        <Route path="/admin/reviews" element={<ProductReviews/>}/>
      

           
  </Route>      
           
         
        
        

        

        <Route path="/password/forgot" element={<ForgotPassword/>} />
        <Route path="/password/reset/:token" element={<ResetPassword/>} />
         
        
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/cart" element={<Cart/>} />

         
      </Routes> 

      <Footer />
    </Router>
  );
}

export default App;
