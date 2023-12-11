    import React ,{useEffect} from 'react'
    import "./Home.css";
    import ProductCard from './productCard.js';
    import MetaData from '../layouts/metadata';
    import Loader from '../layouts/loader/Loader';
    import { clearErrors, getProducts } from '../../actions/productActions';
    import {useDispatch,useSelector} from "react-redux";
    import { useAlert } from 'react-alert';
    


     
    
    
 
    
    

    const Home =() =>{
      const alert=useAlert();
      const dispatch= useDispatch();
      const {loading,products,error}= useSelector( (state) => state.products);
       
        

        
        
          useEffect(() => {
            if(error){
            alert.error(error);
            dispatch(clearErrors());
             }
            dispatch(getProducts());
          }, [dispatch,error,alert]);
          // if (loading) {
          //   return <div>Loading...</div>; // You can add a loading state while waiting for products
          // }
        
          // if (error) {
          //   return <div>Error: {error}</div>; // Handle error if products fetching fails
          // }
        
        //console.log(products);

        
    return (
        <>{loading ?   (<Loader/>): 
        ( 
          <>
          <MetaData title="E-store" />
        
          <div className="banner">
          <h1>Welcome to E-Store</h1> 

          <p>Find products that meet your needs</p>

          <a href="#container">
              <button>
                  Scroll
                  </button>
          </a>
           
          </div>
          <div className="homeheading">
          <h1>Featured Product</h1>
      </div>
    

      <div className="container" id="container">
       {/* {products && products.map((product) => 
        <Product key={product.id } product={product} />
      )} */}
      {/* Add a conditional check before using the map function */}
      {Array.isArray(products) &&
              products.map((product) => <ProductCard key={product._id} product={product} />)
              }
    
      </div>

      </>
        
        
        
       
          
          
  )}

  
  </>
   ) }
        


    export default Home;