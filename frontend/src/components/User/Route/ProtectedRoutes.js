import React from 'react';
import {useSelector} from 'react-redux';
import { Outlet,Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const {loading,isAuthenticated,user }=useSelector(state => state.user);
    
   
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
      }
    
      return (
        <>
          <Outlet />
        </>
     
  )
}

export default ProtectedRoutes
 