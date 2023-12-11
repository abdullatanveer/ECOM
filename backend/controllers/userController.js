const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const cloudinary=require('cloudinary');
const sendEmail=require('../utils/sendEmail');
//const sendToken=require('../utils/getJWT');
const crypto=require('crypto');

 
 

 //Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // try {
  //   let avatar;
  //   if (req.body.avatar) {
  //     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //       folder: "avatars",
  //       width: 150,
  //       crop: "scale",
  //     });
  //     avatar = {
  //       public_id: myCloud.public_id,
  //       url: myCloud.secure_url,
  //     };
  //   }
  try{const { name, email, password } = req.body;
  
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
          public_id: 'sample id',
          url:  "smapleurl",
        },
  
      
  });
  
  
  const token = user.getJWTToken();
  
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure:true,
    sameSite:"none",
  };
  
  res.status(200).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
  }
     
  catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message || 'Internal Server Error', 500));
    
  }
  
   
  
  }
  );

   
 

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    console.log("User not found");
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    //console.log("Password does not match");
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const token = user.getJWTToken();
   
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly:true,
    secure:true,
    sameSite:"none",
  };

  res.status(200).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });

  // const data = {
  //   success: true,
  //   token,
  // };

  // res.status(201).json(data);

  // sendToken(user,200,res);
  // res.status(201).json({
  //     success:true,
  //     user,
  //     token,
  // })
});



exports.logOut = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null),
    {
      expires: new Date(Date.now),
      httpOnly: true,
      secure:true,
      sameSite:"none",
    };

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
 // console.log(user);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken =user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/password/reset/${resetToken}`;
  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/password/reset/${resetToken}`;
  const resetPasswordUrl = `${process.env.FRONTEND_URL }/password/reset/${resetToken}`;

  const message = `Your password reset token is this :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

 

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly:true,
    secure:true,
    sameSite:"none",
  };
  const token = user.getJWTToken();

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  res.status(201).cookie("token", token, options).json({
        success: true,
        user,
        token,
      });

   
});

// get user Details

exports.getUserDetails=catchAsyncErrors(async (req,res,next)=>{
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(201).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });

   
});
// update a profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    //user
  });
});

// get all users

exports.getAllUsers=catchAsyncErrors(async(req,res,next)=>{
  const user= await User.find();

  res.status(200).json({
    success:true,
    user
  })
})

 // Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update a user Role == admin

exports.updateRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role:req.body.role
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    //user
  });
});


/// Delte a uSER
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  user=await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});




