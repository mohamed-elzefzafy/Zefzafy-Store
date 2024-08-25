import express from  "express";
import { createProduct, deleteOneProduct, getAllProducts, getOneProduct, getTopCategoryProducts, updateProduct } 
from "../controllers/productController.js";
import photoUpload from './../middlewares/photoUploadMiddleWare.js';
import { verifyIsAdmin, verifyIsLoggedIn } from "../middlewares/authMiddleware.js";
import { createProductValidation } from "../validation/productValidation.js";
const productRouter = express.Router();

productRouter.route("/get-products").get(getAllProducts);
productRouter.route("/get-one-product/:id").get(getOneProduct);
productRouter.route("/category-products/:categoryId").get(getTopCategoryProducts);
productRouter.use(verifyIsLoggedIn);
productRouter.use(verifyIsAdmin);
productRouter.route("/create-product").post( photoUpload.array("images" , 3) , createProductValidation ,createProduct);
productRouter.route("/update-product/:id").put( photoUpload.array("images" , 3) ,updateProduct);
productRouter.route("/delete-product/:id").delete(deleteOneProduct);






export default productRouter;