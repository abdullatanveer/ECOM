import React from 'react'
import {Link} from "react-router-dom";
 
import { Rating } from "@material-ui/lab";

 

const productCard = ({product}) => {
 // console.log(product);
   
const options = {
  size: "small",
  value: product.ratings,
  readOnly: true,
  precision: 0.5,
};

  return (
     
    
      <Link className="productCard" to={`/product/${product._id}`} >
        {product.images && product.images[0] && (
      <img src={product.images[0].url} alt={product.name} />
    )}
        <p>{product.name}</p>
         
        <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews||0} Reviews)
        </span>
      </div>
        <span>{` Rs ${product.price||0}`}</span>
      </Link>

  );
}

export default productCard;