import categoryRouter from "./categoryRoute.js";
import productRouter from "./productRoute.js";
import reviewRouter from "./reviewRoute.js";
import userRouter from "./userRoute.js";


const mountRoutes = (app) => {
  app.use("/api/v1/users" , userRouter);
  app.use("/api/v1/categories" , categoryRouter);
  app.use("/api/v1/products" , productRouter);
  app.use("/api/v1/reviews" , reviewRouter);
}


export default mountRoutes;