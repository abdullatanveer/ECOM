import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,

  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,

  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,

  CLEAR_ERRORS,
  CREATE_PRODUCT_RESET,
} from "../constants/productConstant";
 



export  const  productsReducer = (
    
    (state = { products: [] }, action) => {
    switch(action.type){
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return{
                loading:true,
                 products:[]
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading:false,
                products:action.payload.product,
                productCount:action.payload.productsCount,
                resultPerPage:action.payload.resultPerPage,
                // filteredProductsCount:action.payload.filteredProductsCount,
            };
        case ADMIN_PRODUCT_SUCCESS:
          return{
            loading:false,
            products:action.payload,
          }
           
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return{
                loading:false,
                error:action.payload,
            };   
        
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }  ;
        default:
            return state;       
    }
});

export const newProductReducer = (state = { product: {}}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload.product,
        success: action.payload.success,
         
      };
    case CREATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};


// product detail reducer
export const productDetailReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case PRODUCT_DETAIL_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case PRODUCT_DETAIL_SUCCESS:
        return {
          loading: false,
          product: action.payload.product,
        };
      case PRODUCT_DETAIL_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  
  };

  export const productReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_PRODUCT_REQUEST:
      case UPDATE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_PRODUCT_FAIL:
      case UPDATE_PRODUCT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_PRODUCT_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_PRODUCT_RESET:
        return {
          ...state,
          isUpdated: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

  

  