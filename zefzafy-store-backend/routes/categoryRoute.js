import express from  "express";
import photoUpload from "../middlewares/photoUploadMiddleWare.js";
import { createCategoryValidation, updateCategoryValidation } from "../validation/categoryValidation.js";
import { createCategory, deleteCategory, getAllCategories, getAllCategoriesForAdmin , getOneCategory, updateCategory } from "../controllers/categoryController.js";
import { verifyIsAdmin, verifyIsLoggedIn } from "../middlewares/authMiddleware.js";
const categoryRouter = express.Router();

categoryRouter.route("/").get(getAllCategories);
categoryRouter.route("/get-one-category/:id").get(getOneCategory);
categoryRouter.use(verifyIsLoggedIn);
categoryRouter.use(verifyIsAdmin);
categoryRouter.route("/admin").get(getAllCategoriesForAdmin);
categoryRouter.route("/create-category").post( photoUpload.single("image") ,createCategoryValidation, createCategory);
categoryRouter.route("/delete-category/:id").delete(deleteCategory);
categoryRouter.route("/update-category/:id").put( photoUpload.single("image") , updateCategoryValidation, updateCategory);





export default categoryRouter;