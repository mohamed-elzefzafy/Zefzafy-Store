import { check } from "express-validator"
import { validatorMiddleWare } from "../middlewares/validatorMiddleWare.js"

export const createCategoryValidation = [
  check("name" , "Name is required").isString(),
  validatorMiddleWare
]

