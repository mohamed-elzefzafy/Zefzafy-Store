import express from  "express";
import { adminGetAllUsers, deleteUser, getUserProfile, login, logout, register, updateUserProfile } from "../controllers/userController.js";
import photoUpload from '../middlewares/photoUploadMiddleWare.js';
import { loginValidation, registerValidation, updateUserValidation } from "../validation/userValidation.js";
import { verifyIsAdmin, verifyIsLoggedIn } from "../middlewares/authMiddleware.js";
const userRouter = express.Router();


userRouter.route("/register").post( photoUpload.single("profilePhoto") ,registerValidation, register);
userRouter.route("/login").post(loginValidation, login);
userRouter.route("/logout").post(logout);
userRouter.use(verifyIsLoggedIn);
userRouter.route("/profile").get(getUserProfile);
userRouter.route("/update-user").put(photoUpload.single("profilePhoto") ,updateUserValidation , updateUserProfile);
userRouter.use(verifyIsAdmin);
userRouter.route("/admin-get-users").get(adminGetAllUsers);
userRouter.route("/delete-user/:id").delete(deleteUser);





export default userRouter;