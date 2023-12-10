import { check } from "express-validator";
import { validateResult } from "./validateResult";

export const validateProductsByOption = [
  check('optionPassword', 'agrega un valor valido').exists(),

  (req, res, next) => {
    validateResult(req, res, next);
  },
]