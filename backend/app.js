 const express=require('express');
 const cookieParser=require('cookie-parser');
 const bodyParser = require("body-parser");
 const fileUpload = require("express-fileupload");
 const cors=require('cors');
 const path = require("path");
 const app=express();
 const dotenv=require('dotenv');

 const errorMiddlewWare=require('./middleware/error');
 app.use(express.json());
 app.use(cookieParser());
 
 const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
  };
  
 app.use(cors(corsOptions));
 //config
 dotenv.config({path:"./config/config.env"});


 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json({ limit: '10mb' }));
 app.use(fileUpload());
  

 //Routes
 const user=require('./routes/userRoute');
 const product=require('./routes/productRoutes');
 const order=require('./routes/orderRoutes');
 const payment=require("./routes/paymentRoutes");
 const supportAgent=require('./routes/supportRoute');

 //User
 app.use("/api/v1",user);
 
 //Product
 app.use("/api/v1",product);

 // order
 app.use("/api/v1",order);

 //payment
 app.use("/api/v1",payment);
 
 //support agent 
 app.use('/support-agent',supportAgent)

  



 // Error MiddleWare
 app.use(errorMiddlewWare);
   
module.exports=app;