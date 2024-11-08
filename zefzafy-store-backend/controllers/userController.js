import asyncHandler from "../middlewares/asyncHandler.js";
import UserModel from "../models/userModel.js";
import customErrorClass from "../utils/customErrorClass.js";
import {
  cloudinaryRemoveImage,
  cloudinaryUploadImage,
} from "./../utils/cloudinary.js";
import bcrypt from "bcryptjs";
import { generateToken } from "./../utils/generateToken.js";
import { paginationFunction } from "./productController.js";

/**---------------------------------------
   * @desc    register user
   * @route   /api/v1/users/register
   * @method  POST
   * @access  public 
   ----------------------------------------*/
export const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName ,email, password } = req.body;
  const userExists = await UserModel.findOne({ email: email });
  if (userExists) {
    return next(
      customErrorClass.create(`user with this email is already exist`, 400)
    );
  }

  const user = await UserModel.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (!user) {
    return next(customErrorClass.create(`invalid user data`, 400));
  }

  // upload profile photo to cloudinary
  // start
  if (req.file) {
    // upload the photo to cloudinary
    const result = await cloudinaryUploadImage(req.file.path);

    //  Change the profilePhoto field in the DB
    user.profilePhoto = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    await user.save();
  }
  //finish

  generateToken(res, user._id);


  res.status(201).json(user);
});

/**---------------------------------------
 * @desc    login user
 * @route   /api/v1/users/login
 * @method  POST
 * @access  public 
 ----------------------------------------*/
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    return next(customErrorClass.create(`invalid email or password`, 401));
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return next(customErrorClass.create(`invalid email or password`, 401));
  }

  generateToken(res, user._id);
  res
    .status(201)
    .json(user);
});

/**---------------------------------------
 * @desc    logout user
 * @route   /api/v1/users/logout
 * @method  POST
 * @access  private 
 ----------------------------------------*/
export const logout = asyncHandler(async (req, res) => {
  await res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "logged out successfully" });
});

/**---------------------------------------
* @desc    get user profile
* @route   /api/v1/users/profile
* @method  GET
* @access  private 
----------------------------------------*/
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id).select("-password");

  if (!user) {
    return next(customErrorClass.create(`user not found`, 404));
  }

  res.status(200).json(user);
});
/**---------------------------------------
 * @desc    update user profile
 * @route   /api/v1/users/profile
 * @method  PUT
 * @access  private 
 ----------------------------------------*/
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { firstName ,lastName , email, password , country ,address , phoneNumber} = req.body;
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    return next(customErrorClass.create(`user not found`, 404));
  }

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;
  user.password = password || user.password;
  user.country = country || user.country;
  user.address = address || user.address;
  user.phoneNumber = phoneNumber || user.phoneNumber;


  if (req.file) {
    if (user.profilePhoto.public_id !== null) {
      await cloudinaryRemoveImage(user.profilePhoto.public_id);
    }
    // upload the photo to cloudinary
    const result = await cloudinaryUploadImage(req.file.path);

    //  Change the profilePhoto field in the DB
    user.profilePhoto = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  await user.save();

  res.status(200).json(user);
});


/**---------------------------------------
 * @desc    update user profile
 * @route   /api/v1/users/profile
 * @method  PUT
 * @access  private 
 ----------------------------------------*/
export const adminGetAllUsers = asyncHandler(async (req, res) => {
  const {pagination , pageSize , skip} = await paginationFunction(20 , req , UserModel );
  const users = await UserModel.find().sort({"isAdmin" : "desc"}).limit(pageSize).skip(skip);
  
  res.status(200).json({users , pagination});
});

/**---------------------------------------
 * @desc    update user profile
 * @route   /api/v1/users/delete-user:id
 * @method  PUT
 * @access  private  - admin
 ----------------------------------------*/
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return next(customErrorClass.create(`user not found`, 404));
  }

  if (user.profilePhoto.public_id !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.public_id);
  }

  await user.deleteOne();

  res.status(200).json("user deleted succesfully");
});
