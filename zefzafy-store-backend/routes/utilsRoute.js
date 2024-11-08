import express from  "express";
import { verifyIsAdmin, verifyIsLoggedIn } from "../middlewares/authMiddleware.js";
import ProductModel from "../models/productModel.js";
import CategoryModel from "../models/categoryModel.js";
import UserModel from "../models/userModel.js";
import OrderModel from "../models/orderModel.js";
const utilsRouter = express.Router();


utilsRouter.use(verifyIsLoggedIn);
utilsRouter.use(verifyIsAdmin);
utilsRouter.route("/all-counts").get( 
            /**---------------------------------------
 * @desc    get counts
 * @route   /api/v1/utils/all-counts
 * @method  GET
 * @access  private admin 
 ----------------------------------------*/
async (req , res , next) => {
    const productsCount = await ProductModel.countDocuments();
    const categoriesCount = await CategoryModel.countDocuments();
    const usersCount = await UserModel.countDocuments();
    const ordersCount = await OrderModel.countDocuments();
    
    res.status(200).json({productsCount , categoriesCount , usersCount , ordersCount})
})
     


export default utilsRouter;