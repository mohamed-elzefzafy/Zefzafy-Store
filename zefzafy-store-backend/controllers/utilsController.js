import asyncHandler from "../middlewares/asyncHandler.js";
import BannersModel from "../models/bannersModel.js";
import CategoryModel from "../models/categoryModel.js";
import OrderModel from "../models/orderModel.js";
import ProductModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";


  /**---------------------------------------
 * @desc    get counts
 * @route   /api/v1/utils/all-counts
 * @method  GET
 * @access  private admin 
 ----------------------------------------*/
 export const getAccounts = asyncHandler( async (req, res, next) => {
    const productsCount = await ProductModel.countDocuments();
    const categoriesCount = await CategoryModel.countDocuments();
    const usersCount = await UserModel.countDocuments();
    const ordersCount = await OrderModel.countDocuments();
    const bannersCount = await BannersModel.countDocuments();

    res.status(200).json({ productsCount, categoriesCount, usersCount, ordersCount , bannersCount});
  });
