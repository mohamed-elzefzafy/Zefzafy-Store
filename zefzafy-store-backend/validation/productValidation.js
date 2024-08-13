import { check } from "express-validator"
import { validatorMiddleWare } from "../middlewares/validatorMiddleWare.js"


  export const createProductValidation = [
    check("name" , "Name is required").isString(),
    check("description" , "description is required").isString(),
    check("price" , "price is required").isNumeric(),
    check("countInStock" , "countInStock is required").isNumeric().withMessage("countInStock must be a number"),
    validatorMiddleWare
  ]