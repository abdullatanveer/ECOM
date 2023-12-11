const express=require("express");
const { processPayment,sendStripeApiKey } = require("../controllers/paymentController");
const {isAuthenticated}=require('../middleware/auth');
const router=express.Router();


router.route('/process/payment').post(isAuthenticated,processPayment);
router.route("/stripeapikey").get(isAuthenticated,sendStripeApiKey);

 

module.exports=router;