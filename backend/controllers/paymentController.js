const express=require("express");
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const stripe = require("stripe")("sk_test_51Nd6A8IQ2ZA9ryOa9q8smKp3of9jBy4iQ4SJq2M2Ij2SscI1mq02sm4xBuIMA1oHENwGGxlCbp2ygOpTPZnIbnlO00YLIY9Kz9");

// exports.processPayment = catchAsyncErrors(async (req, res, next) => {

//   const myPayment = await stripe.paymentIntents.create({
//     amount: req.body.amount,
//     currency: "inr",
//     metadata: {
//       company: "Ecommerce",
//     },
//   });

//   res
//     .status(200)
//     .json({ success: true, client_secret: myPayment.client_secret });
// });
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        setup_future_usage: "off_session",
         
        metadata: {
          company: "Ecommerce",
        },
      });
  
      res.status(200).json({ success: true, client_secret: myPayment.client_secret });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ success: false, message: 'An error occurred while processing the payment.' });
    }
  });
  

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({stripeApiKey:"pk_test_51Nd6A8IQ2ZA9ryOaBhAxzTxTgUqdl8SK1zCau9wQEomFU2lAuGOzngObUF01YyqAe6xkrTPOolGxj37cLkhdknYW00QA8Jo4xu"})
})

 
 