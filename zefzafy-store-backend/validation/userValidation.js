import { check } from "express-validator"
import { validatorMiddleWare } from "../middlewares/validatorMiddleWare.js"

export const registerValidation = [
  check("name" , "Name is required").isString(),
  check("email" , "email is required").isEmail(),
  check("password" , "password length at least 6 characters").isLength({min : 6}),
  validatorMiddleWare
]

export const loginValidation = [
  check("email" , "email is required").isEmail(),
  check("password" , "password length at least 6 characters").isLength({min : 6}),
  validatorMiddleWare
]


export const updateUserValidation = [
  check("name" , "Name is required").isString().optional(),
  check("email" , "email is required").isEmail().optional(),
  check("password" , "password length at least 6 characters").isLength({min : 6}).optional(),
  validatorMiddleWare
]