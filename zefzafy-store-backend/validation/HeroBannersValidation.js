import { check } from "express-validator";
import { validatorMiddleWare } from "../middlewares/validatorMiddleWare.js";


export const createHeroBannersValidation = [
    check("text" , "text is required").isString(),
    check("discount").isInt().withMessage("discount must be number").optional()
    .custom((value, { req }) => {
      if (value % 5 !== 0 || value < 5 || value > 100) {
        throw new Error("invalid discount number");
      }
      return true;
    }),
    check("image")
   .custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      return true;
    }) .optional(),
    validatorMiddleWare
  ]
  
  

