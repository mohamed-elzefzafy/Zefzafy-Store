import asyncHandler from "../middlewares/asyncHandler.js";
import UserModel from "../models/userModel.js";
import customErrorClass from "../utils/customErrorClass.js";
import ProductModel from './../models/productModel.js';


  
   /**---------------------------------------
   * @desc    register user
   * @route   /api/v1/wishlist/add-wishlist/:productId
   * @method  PUT
   * @access  public 
   ----------------------------------------*/
   export const toggleAddRemoveWishlist = asyncHandler(async (req , res , next) => {
    let user = await UserModel.findById(req.user._id);
    if (!user) {
      return next(customErrorClass.create(`user not exist` , 401))
    }
    const product = await ProductModel.findById(req.params.productId);
    if (!product) {
      return next(customErrorClass.create(`there's no product with id (${req.params.productId})` , 400))
    }
   
    const productExistInWishlist = user.wishList.find(wl => wl._id.toString() === product._id.toString());
    if (productExistInWishlist) {
      user = await UserModel.findByIdAndUpdate({ _id :req.user._id} ,

        {$pull : {wishList :product._id}}
        ,{new : true}
       )

    } else {
      user = await UserModel.findByIdAndUpdate({ _id :req.user._id} ,

        {$push : {wishList :product._id}}
        ,{new : true}
       )
    }

    
   res.status(200).json(user);
   }); 


      /**---------------------------------------
   * @desc    register user
   * @route   /api/v1/wishlist/add-wishlist/:productId
   * @method  PUT
   * @access  public 
   ----------------------------------------*/
   export const getLoggedUserWishlist = asyncHandler(async (req , res , next) => {
    const user = await UserModel.findById(req.user._id);
    const userWishlistIds = user.wishList.map(wishlist => wishlist._id);
    const products = await ProductModel.find({_id : {$in: userWishlistIds}});
    res.status(200).json(products);
   })