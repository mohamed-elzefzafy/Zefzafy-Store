import express from "express";
import {
  verifyIsAdmin,
  verifyIsLoggedIn,
} from "../middlewares/authMiddleware.js";
import photoUpload from "../middlewares/photoUploadMiddleWare.js";
import { createHeroBannersValidation } from "../validation/HeroBannersValidation.js";
import { createBanner, deleteBanner, getAllBanners, getOneBanner, updateBanner } from "../controllers/bannersController.js";
const bannersRouter = express.Router();

bannersRouter.route("/get-hero-slider-images").get(getAllBanners);
bannersRouter.use(verifyIsLoggedIn);
bannersRouter.use(verifyIsAdmin);

bannersRouter.route("/create-hero-slider-banners").post(photoUpload.single("image") , 
createHeroBannersValidation , createBanner);


bannersRouter.route("/get-hero-slider-images/:bannerId").get(getOneBanner);
bannersRouter.route("/delete-hero-slider-images/:bannerid").delete(deleteBanner);
bannersRouter.route("/update-hero-slider-images/:bannerid").put(photoUpload.single("image") ,updateBanner);


export default bannersRouter;



