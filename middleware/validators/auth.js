import { check } from "express-validator"
import { validateResult } from "./validateResult";

export const validateRegister = [
  check('email', 'agrega un email valido').isEmail().exists(),
  check('password', 'el password debe ser minimo de 6 caracteres').isLength({min: 6}).exists(),
  check('confirmPassword', 'el password debe ser minimo de 6 caracteres').isLength({min: 6}).exists(),
  (req, res, next) => {
    validateResult (req, res, next);
  },
]

export const validateLogin = [
  check("email", "agrega un email valido").isEmail(),

  (req, res, next) => {
    validateResult (req, res, next);
  },
]

