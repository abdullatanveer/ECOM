const Product=require('../models/productModel');
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');
const ErrorHandler=require('../utils/errorHandler');
const cloudinary=require("cloudinary")




// cretae Product  --Admin

exports.createProduct= catchAsyncErrors(async (req,res)=>{
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  req.body.user=req.user.id;
 
    const product =await Product.create(req.body);
    console.log(product);
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.status(201).json({
        success:true,
        product
    });
});
// get all products
// exports.getAllProducts =  catchAsyncErrors(async  (req,res,next)=>{
//   //return next(new ErrorHandler("Temporary Eroor",500));

//     const resultPerPage =8;
//     const productCount= await Product.countDocuments();

//     const apiFeature= new ApiFeatures(Product.find(), req.query)
//     .search()
//     .filter()

//     let product= await apiFeature.query;
//     let filteredProductCount=product.length;
//     apiFeature.pagination(resultPerPage);
//     product= await apiFeature.query;
//     res.status(201).json({
//         success:true,
//         product,
//         productCount,
//         resultPerPage,
//         filteredProductCount,
        
//     })
// });

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const product= await apiFeature.query;

  // let filteredProductsCount = product.length;

  // apiFeature.pagination(resultPerPage);

  // product = await apiFeature.query;

  res.status(200).json({
    success: true,
    product,
    productsCount,
    resultPerPage,
    // filteredProductsCount,
  });
});

// Get All Product
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products=await Product.find();

  res.status(200).json({
    success: true,
    products,
     
    // filteredProductsCount,
  });
});


//update a product --Admin
// exports.updateProduct= async (req,res,next)=>{
//     const id=req.params.id;
//     let product= await Product.findById(id);
//     if(!product){
//         return  res.status(401).json({
//             sucess:false,
//             message:'Product Not Found'
//         })
//     }

//     product=await Product.findByIdAndUpdate(id,req.body,
//         { new:true,
//           runValidators:true,
//           useFindandModify:false,
      
//     });
//     res.status(200).json({
//         success:true,
//         product
//     })
// }
 


 // Delete a Product 

// exports.deleteProduct = async (req,res,next)=>{
//     const id=req.params.id;
//     let product = await Product.findById(id);

//     if(!product){
//         return res.status(500).json({success:false,message:'Product Not found'})
//     }

//      product =await Product.findByIdAndDelete(req.params.id);
//     res.status(201).json({success:true, message:'Product deleted Successfuly'});
 


//   }


// get Product Details


// module.exports.getProductDetail= async(req,res,next) =>{
   
//     const id=req.params.id;
//     const product= await Product.findById(id);
//     if(!product){
//        return next (new ErrorHandler("Product not Found",401));
//     //    return  res.status(401).json({
//     //         success:false,
//     //         message:"Product not availab;le"
//     //     })
//     }
        
   
    
//    // product = await Product.findById(id);
//     res.status(201).json({
//         success:true,
//         product
//     })

// }

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });

  //Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
  console.log(avg);
  console.log(ratings);
  console.log(reviews.length)

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
 
    


