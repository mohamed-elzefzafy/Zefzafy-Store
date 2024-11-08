import { check } from "express-validator"
import { validatorMiddleWare } from "../middlewares/validatorMiddleWare.js"

export const createCategoryValidation = [
  check("name" , "Name is required").isString(),
  check("image")
  .custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Images are required");
    }
    return true;
  }),
  validatorMiddleWare
]

export const updateCategoryValidation = [
  check("name" , "Name is required").isString().optional(),
  check("image")
 .custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Images are required");
    }
    return true;
  }) .optional(),
  validatorMiddleWare
]

