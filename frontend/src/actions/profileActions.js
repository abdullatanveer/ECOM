import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    // UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
     
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
     

    CLEAR_ERRORS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
      
} 
from '../constants/userConstant';
import axios from 'axios';

const baseUrl = "http://localhost:3001";

export const updateProfile = (userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
  
      const config = { headers: 
        { "Content-Type": "multipart/form-data" },
          withCredentials:true
       };
  
      const { data } = await axios.put(`${baseUrl}/api/v1/me/updateProfile`, userData, config);
     
     
  
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });


       
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  export const updatePassword = (passwords) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
  
      const config = { headers: 
        { "Content-Type": "application/json" },
          withCredentials:true
       };
  
      const { data } = await axios.put(`${baseUrl}/api/v1/me/password/update`, passwords, config);
     
     
  
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });


       
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };



// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" },
        withCredentials:true,
     
    };
  
      const { data } = await axios.post(`${baseUrl}/api/v1/password/forgot`, email, config);
  
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

   // Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `${baseUrl}/api/v1/password/reset/${token}`,
        passwords,
        config
      );
  
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };



   // Load User
export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
      const config = { 
        headers: { "Content-Type": "application/json" } ,
        withCredentials:true,
      };
  
      const { data } = await axios.get(`${baseUrl}/api/v1/me`,config);
      console.log(data);
  
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
  };
  
  
  export const clearErrors = () => (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
}