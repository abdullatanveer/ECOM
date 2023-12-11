const express = require("express");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary=require("cloudinary");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  getProductDetail,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { route } = require("../app");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
//const {getProductDetail}= require('../controllers/productController');

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route('/admin/products').get(isAuthenticated,authorizeRoles("admin"),getAdminProducts);
router
  .route("/admin/products/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);

//router.route('products/:id').put(updateProduct);
router.route("/admin/products/:id").put(
  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    let product = await Product.findById(id);
    if (!product) {
      return next(new ErrorHandler("Product not Found", 404));
    }

    // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
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
  }

    product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindandModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
  })
);

//update a product --Admin

// delete a product
router.route("/admin/product/:id").delete(
  isAuthenticated,
  authorizeRoles("admin"),
  catchAsyncErrors(async (req, res) => {
    const id = req.params.id;
    let product = await Product.findById(id);

    if (!product) {
      return next(new ErrorHandler("Product not Found", 404));
      // res.status(500).json({success:false,message:'Product Not found'})
    }
    // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

    product = await Product.findByIdAndDelete(req.params.id);
    res
      .status(201)
      .json({ success: true, message: "Product deleted Successfuly" });
  })
);

//get product details
//router.route('/product/:id').get(getProductDetail);

router.route("/product/:id").get(async (req, res, next) => {
  // const id = req.params.id;
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));

     
 
    
    // return res.status(401).json({
    //     success:false,
    //     message:"Product not found"
    // });
  }

  // product = await Product.findById(id);
  res.status(201).json({
    success: true,
    product
    
  });
});

// reviews and ratings

router.route("/product/review").put(isAuthenticated, createProductReview);

 //get all product review
router.route("/admin/reviews").get(isAuthenticated ,getProductReviews);

// delete product review
 router.route("/admin/reviews").delete(isAuthenticated,deleteReview);

module.exports = router;
