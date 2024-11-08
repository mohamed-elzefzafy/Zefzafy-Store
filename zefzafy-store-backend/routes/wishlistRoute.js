import express from  "express";
import { verifyIsLoggedIn, verifyUserNotAdmin } from "../middlewares/authMiddleware.js";
import {  getLoggedUserWishlist, toggleAddRemoveWishlist } from "../controllers/wishlistController.js";
const wishlistRouter = express.Router();


wishlistRouter.use(verifyIsLoggedIn);
wishlistRouter.use(verifyUserNotAdmin);
wishlistRouter.route("/add-wishlist/:productId").put(toggleAddRemoveWishlist);
wishlistRouter.route("/add-wishlist/logged-user").get(getLoggedUserWishlist);


export default wishlistRouter;