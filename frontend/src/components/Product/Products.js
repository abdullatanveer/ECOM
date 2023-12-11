import React, { useEffect,useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProducts } from "../../actions/productActions";
import { useAlert } from "react-alert";
import ProductCard from "../Home/productCard";
import Loader from "../layouts/loader/Loader";
import './Product.css';
import { Pagination } from "@mui/material";
import Slider from '@material-ui/core/Slider';
import Typography from "@material-ui/core/Typography";

const categories=[
    "Laptop",
    "Mobile",
    "Top",
    "Attiree",
    "Electronics",
    "Painting"
]
    


const Products = ( ) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {keyword}=useParams();
  const [currentPage,setCurrentPage]=useState(1);
  const [price ,setPrice]=useState([0,25000]);
  const [category,setCategory]=useState('');
  const [ratings,setRatings]=useState(0);
  
  
  const { products, loading, error,resultPerPage,productCount} = useSelector((state) => state.products);


  const setCurrentPageNo =(page) =>  {
    console.log(page);
    setCurrentPage(page);
    
  }

  const priceHandler = (e,newPrice)=>{
    setPrice(newPrice);
  }
 
const totalPages= Math.ceil(productCount / resultPerPage);
   


//   const paginationVisibility = () => {
//     if (totalPages < 1) {
//       return "hidden";
//     } else {
//       return "visible";
//     }
//   };

   
 

  useEffect(() => {
    if (error) alert.error(error);
    dispatch(clearErrors());

    dispatch(getProducts(keyword,currentPage,price,category,ratings,error));
  }, [dispatch, alert,keyword,currentPage,price,category,ratings,error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
         {/*   Displaying a  product */}
          <h2 className="productsHeading">Products</h2>

          <div className="products" >
            {Array.isArray(products) &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>


           {/*  filtering  product */}
           <div className="filterBox">
            <Typography>Price</Typography>
                <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
                />

            <Typography>Categories</Typography>
                        <ul className="categoryBox">
                        {categories.map((category) => (
                            <li
                            className="category-link"
                            key={category}
                            onClick={() => setCategory(category)}
                            >
                            {category}
                            </li>
                        ))}
                        </ul>

             <fieldset>
                    <Typography component="legend">Ratings Above</Typography>
                    <Slider
                        value={ratings}
                        onChange={(e, newRating) => {
                        setRatings(newRating);
                        }}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
                    />
            </fieldset>
            </div>

             
            



           {/*  Pagination */}
           {  totalPages >1 &&  products.length >=resultPerPage &&(
             <div className="paginationBox">
             <Pagination
               page={currentPage}
               onChange={(e, page) => setCurrentPageNo(page)}
               color="primary"
               size="large"
               count={totalPages}
               showFirstButton
               showLastButton
               shape="rounded"
               sx={{
                 marginTop: "2rem",
                 "& .Mui-selected": {
                   backgroundColor: "tomato",
                   color: "white",
                 },
               }}
             />
           </div>
            
           )}
              
            
          
             
            
          
        </>
      )}
    </>
  );
};

export default Products;
