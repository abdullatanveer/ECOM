import React ,{useState}  from 'react'
import Carousel from 'react-material-ui-carousel';
 
import './ProductDetail.css';
import { useSelector,useDispatch } from "react-redux";
import { clearErrors, getProductDetail } from '../../actions/productActions';
import { addItemsToCart } from '../../actions/cartActions';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewCard from  './ReviewCard.js';
import Loader from '../layouts/loader/Loader';
import {useAlert} from 'react-alert';
import {newReview} from "../../actions/reviewActions";
 
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/reviewConstants";
 
 


 


const ProductDetail = () => {
     
    const dispatch=useDispatch();
    const alert = useAlert();
    const {id}=useParams();
    const [quantity,setQunatity]=useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
 
  
    

    
    const {product,loading,error}=useSelector((state) =>state.productDetail);
    const {success,error:reviewError} =useSelector(state=>state.newReview);
    
    const options = {
      size: "small",
      value: product.ratings,
      readOnly: true,
      precision: 0.5,
    };

    const increaseQuantity = () => {
      console.log("product stock is " ,product.stock);
      console.log(" current quantity is " ,quantity);
      if (product.stock <= quantity) {
        console.log('not enough stock')
        return;
      }
      setQunatity(quantity + 1);
      console.log("updated quantity",quantity)
    }
    const decreaseQuantity = ()=>{
      if(quantity <=1) return;
      setQunatity(quantity -1);
    }

    const addToCarthandler = ()=>{
      dispatch(addItemsToCart(id,quantity));
      alert.success("Item Added To Cart");

    }

    const submitReviewToggle = () => {
      open ? setOpen(false) : setOpen(true);
    };

    const submitReviewHandler =()=>{
     const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);

    }





    useEffect(()=>{

      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
        dispatch(getProductDetail(id))

        if(reviewError){
          alert.error(reviewError);
          dispatch(clearErrors())
        }
        
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    },[dispatch,id,error,alert,success,reviewError] );

     

  return (
     <>
     {loading ? (<Loader/>):(
      <>
       <div className="ProductDetails">
        
        <div>
            <Carousel>
                {product.images &&
                product.images.map((item,i)=>(
                    <img
                    className="CarouselImage"
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
                  />  
                ))
                }
            </Carousel>
        </div>
        <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>ID {product._id}</p>
              </div>
              
              <div className="detailsBlock-2">
                  
                        
                            <Rating {...options} />
                         <span className="detailsBlock-2-span">
                                ({product.numofReviews} Reviews)
                            </span>
                            
                </div>


              <div className="detailsBlock-3">
                <h1>{`Rs ${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}  >-</button>
                    <input readOnly type="number" 
                    value={quantity} 
                    />
                    <button onClick={increaseQuantity} >+</button>
                  </div>
                  <button  
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCarthandler}
                    style={{
                      background: product.stock < 1 ? "gray" : "tomato",
                    }}

                    
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle}  className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} variant='outlined' color="secondary">
                Cancel
              </Button>
              <Button  onClick={submitReviewHandler} variant='outlined' color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

           {product.reviews && product.reviews[0] ? (
            <div className="reviews">
                {product.reviews &&
                product.reviews.map((review)=> <ReviewCard key={review._id} review={review}/>)
                }

            </div>
           ):(
            <p className='noreviews'>No reviews</p>
           )}

      </>
     )}
     
     
         
     
     </>
  )
}

export default ProductDetail;