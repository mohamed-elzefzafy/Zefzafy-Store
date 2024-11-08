import express from  "express";
import { verifyIsAdmin, verifyIsLoggedIn, verifyUserNotAdmin } from "../middlewares/authMiddleware.js";
import { createOrder, getOneOrder, getOrdersByAdmin, getUserOrders, updateOrderToDeliverd, updateOrderToPaid } from "../controllers/orderController.js";
import { createOrderValidation } from "../validation/orderValidation.js";
const orderRouter = express.Router();


orderRouter.use(verifyIsLoggedIn);
//TODO: make express validate to create order
orderRouter.route("/create-Order").post( verifyUserNotAdmin , createOrderValidation , createOrder);
orderRouter.route("/get-user-orders").get( verifyUserNotAdmin , getUserOrders);
orderRouter.route("/get-one-order/:orderId").get( getOneOrder);

// admin routes
orderRouter.use(verifyIsAdmin);
orderRouter.route("/paid/:id").put(updateOrderToPaid);
orderRouter.route("/delivered/:id").put(updateOrderToDeliverd);
orderRouter.route("/admin").get(getOrdersByAdmin);

export default orderRouter;