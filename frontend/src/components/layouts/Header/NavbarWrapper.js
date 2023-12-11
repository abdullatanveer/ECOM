import React from 'react';
import { useSelector } from 'react-redux';


import CustomerHeader from './CustomerHeader';
import Header from './Header'
const NavbarWrapper = () => {
  // Assuming you have a user object or role in your Redux store
  const user = useSelector(state => state.user);

  return (
    <div>
      {user.role === 'customerAgent ' ? (
        <CustomerHeader />
      ) :  (
        <Header />
      )  
      }
    </div>
  );
};

export default NavbarWrapper;
