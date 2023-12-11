const User=require('../models/userModel');
// creating a token and sending in cookie
const sendToken=(user,statusCode,res)=>{
     const token=user.getJWTTOKEN();

     //options for cookies

     const options = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpsOnly: true,
        secure:true,
        sameSite:"none",
      };
    
      res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
      });
    };
    
    module.exports = sendToken;
