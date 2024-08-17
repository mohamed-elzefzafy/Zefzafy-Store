import express from  "express";
import { verifyIsLoggedIn, verifyUserNotAdmin } from "../middlewares/authMiddleware.js";
import { addToCart, clearCart, getUserCart , removeProductFromCart} from "../controllers/cartController.js";
const cartRouter = express.Router();


cartRouter.use(verifyIsLoggedIn);
cartRouter.use(verifyUserNotAdmin);
cartRouter.route("/add-cart/:productId").post(addToCart);
cartRouter.route("/get-user-cart").get(getUserCart);
cartRouter.route("/remove-product/:productId").delete(removeProductFromCart);
cartRouter.route("/clear-cart/:cartId").delete(clearCart);


export default cartRouter;