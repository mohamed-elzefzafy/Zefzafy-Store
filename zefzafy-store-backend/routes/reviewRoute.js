import express from  "express";
import { verifyIsAdmin, verifyIsLoggedIn, verifyUserNotAdmin } from "../middlewares/authMiddleware.js";
import { createReview, removeReviewByAdmin, removeReviewByLoggedUser, updateReviewByLoggedUser } from "../controllers/reviewController.js";
import { createReviewValidation, updateReviewValidation } from "../validation/reviewValidation.js";
const reviewRouter = express.Router();


reviewRouter.use(verifyIsLoggedIn);
reviewRouter.route("/admin-remove-review/:productId").put(verifyIsAdmin ,removeReviewByAdmin);
reviewRouter.use(verifyUserNotAdmin);
reviewRouter.route("/create-review/:productId").put(createReviewValidation , createReview);
reviewRouter.route("/remove-review/:productId").put(removeReviewByLoggedUser);
reviewRouter.route("/update-review/:productId").put( updateReviewValidation ,updateReviewByLoggedUser);








export default reviewRouter;