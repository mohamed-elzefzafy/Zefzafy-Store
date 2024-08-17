import express from  "express";
import { verifyIsLoggedIn, verifyUserNotAdmin } from "../middlewares/authMiddleware.js";
import {  toggleAddRemoveWishlist } from "../controllers/wishlistController.js";
const wishlistRouter = express.Router();


wishlistRouter.use(verifyIsLoggedIn);
wishlistRouter.use(verifyUserNotAdmin);
wishlistRouter.route("/add-wishlist/:productId").put(toggleAddRemoveWishlist)


export default wishlistRouter;