import {LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOAD_USER_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    
    
    CLEAR_ERRORS,
   
}  from '../constants/userConstant';
 
import axios from 'axios';

const baseUrl = "http://localhost:3001";
  
 

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { 
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
   };

    const { data } = await axios.post(
        `${baseUrl}/api/v1/login`,
      { email, password },
      config
    );

    
    // console.log(data.token);

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};


  export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });
  
      const config = { headers: 
        { "Content-Type": "multipart/form-data" },
          withCredentials:true
       };
  
      const { data } = await axios.post(`${baseUrl}/api/v1/register`, userData, config);
     
    console.log(data.token);
  
      dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
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
    

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};



 



// Logout a user 
export const logOut = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const config = { 
      headers: { "Content-Type": "application/json" } ,
      withCredentials:true,
    };

     await axios.get(`${baseUrl}/api/v1/logout`,config);
     

    dispatch({ type: LOGOUT_SUCCESS});
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const config={
      withCredentials:true,
    }
    const { data } = await axios.get(`${baseUrl}/api/v1/admin/users`,config);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const config={
      withCredentials:true,
    }
    const { data } = await axios.get(`${baseUrl}/api/v1/admin/user/${id}`,config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    

    const config = { headers: { "Content-Type": "application/json" },withCredentials:true, };

    const { data } = await axios.put(
      `${baseUrl}/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const config={
      withCredentials:true,
    }

    const { data } = await axios.delete(`${baseUrl}/api/v1/admin/user/${id}`,config);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};



 




  

export const clearErrors = () => (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
}