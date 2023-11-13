import { check } from "express-validator"
import { validateResult } from "./validateResult";

export const validateCategory = [
    check("name").exists().notEmpty(),
  
    (req, res, next) => {
      validateResult (req, res, next);
    },
  ]
  