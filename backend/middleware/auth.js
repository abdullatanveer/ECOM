const ErrorHandler=require('../utils/errorHandler');
const catchAsyncErrors=require('./catchAsyncErrors');
const jwt =require('jsonwebtoken');
const User=require('../models/userModel');

exports.isAuthenticated=(catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
    //console.log(token);

    if(!token){
        return next(new ErrorHandler("Please login First",401))
    }

    const decodedData= jwt.verify(token,process.env.JWT_Secret);

      req.user=await User.findById(decodedData.id);

       next();

})
)
// exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
//     const authorization = req.header('Authorization');
  
//     if (!authorization || !authorization.startsWith('Bearer ')) {
//       return next(new ErrorHandler("Please login First", 401));
//     }
  
//     const token = authorization.split(' ')[1];
  
//     if (!token) {
//       return next(new ErrorHandler("Please login First", 401));
//     }
  
//     try {
//       const decodedData = jwt.verify(token, process.env.JWT_Secret);
  
//       req.user = await User.findById(decodedData.id);
  
//       next();
//     } catch (error) {
//       return next(new ErrorHandler("Invalid token.", 401));
//     }
//   });
  


exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`Role:  ${req.user.role} is nnot allowed to perform this operation`,403));
        // return res.status(403).json({
        //     success:false,
        //     message:"you are not allowed to perform this operation"
        // })

    }
    
    next();
}
}
