import express from "express";
import {
  verifyIsAdmin,
  verifyIsLoggedIn,
} from "../middlewares/authMiddleware.js";
import { getAccounts } from "../controllers/utilsController.js";
const utilsRouter = express.Router();

utilsRouter.use(verifyIsLoggedIn);
utilsRouter.use(verifyIsAdmin);
utilsRouter.route("/all-counts").get(getAccounts);



export default utilsRouter;
