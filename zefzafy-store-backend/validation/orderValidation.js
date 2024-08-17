import { check } from "express-validator"
import { validatorMiddleWare } from "../middlewares/validatorMiddleWare.js"

export const createOrderValidation = [
  check("paymentMethod" , "paymentMethod is required").isString(),
  validatorMiddleWare
]

