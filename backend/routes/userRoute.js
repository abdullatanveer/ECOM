const express = require("express");
const {
  registerUser,
  loginUser,
  logOut,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
 
// const ErrorHandler = require("../utils/errorHandler");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const User = require("../models/userModel");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

//forgot passwod
router.route("/password/forgot").post(forgotPassword);

//reset password
router.route("/password/reset/:token").put(resetPassword);

// get your detauls

router.route("/me").get(isAuthenticated, getUserDetails);

//update password
router.route("/me/password/update").put(isAuthenticated, updatePassword);

// update user profile
router.route("/me/updateProfile").put(isAuthenticated, updateProfile);

// ADMIN-- GET ALL USERS

router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUsers);

// ADMin -- get single user
router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleUser);

// Admin == Update Role
router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateRole);

// Admin == Delete a User 
router
  .route("/admin/user/:id").delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

router.route("/logout").get(logOut);

module.exports = router;
