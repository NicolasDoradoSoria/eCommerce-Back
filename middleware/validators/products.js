import { check } from "express-validator";
import { validateResult } from "./validateResult";

export const validateProductsByOption = [
  check('optionPassword', 'agrega una clave valido').isEmail().exists(),
  check('optionValue', 'agrega un valor valido').isEmail().exists(),

  
  (req, res, next) => {
    validateResult(req, res, next);
  },
]