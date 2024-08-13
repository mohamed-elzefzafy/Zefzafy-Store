import { check } from "express-validator";
import { validatorMiddleWare } from "../middlewares/validatorMiddleWare.js";



export const createReviewValidation = [
  check("comment" , "comment is required").isString(),
  check("rating" , "rating is required").isInt({min: 1, max: 5}).withMessage("min rating is 1 and max rating is 5"),
  validatorMiddleWare
]
export const updateReviewValidation = [
  check("comment" , "comment is required").optional().isString(),
  check("rating" , "rating is required").optional().isInt({min: 1, max: 5}).withMessage("min rating is 1 and max rating is 5"),
  validatorMiddleWare
]