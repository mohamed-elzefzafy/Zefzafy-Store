import bannersRouter from "./bannersRoute.js";
import cartRouter from "./cartRoute.js";
import categoryRouter from "./categoryRoute.js";
import orderRouter from "./orderRoute.js";
import productRouter from "./productRoute.js";
import reviewRouter from "./reviewRoute.js";
import userRouter from "./userRoute.js";
import utilsRouter from "./utilsRoute.js";
import wishlistRouter from "./wishlistRoute.js";


const mountRoutes = (app) => {
  app.use("/api/v1/users" , userRouter);
  app.use("/api/v1/categories" , categoryRouter);
  app.use("/api/v1/products" , productRouter);
  app.use("/api/v1/reviews" , reviewRouter);
  app.use("/api/v1/wishlist" , wishlistRouter);
  app.use("/api/v1/cart" , cartRouter);
  app.use("/api/v1/orders" , orderRouter);
  app.use("/api/v1/utils" , utilsRouter);
  app.use("/api/v1/banners" , bannersRouter);
}


export default mountRoutes;