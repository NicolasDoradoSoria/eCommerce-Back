import { check } from "express-validator"
import { validateResult } from "./validateResult";
import Category from "../../models/Category";

export const validateRegister = [
  check('email', 'agrega un email valido').isEmail().exists(),
  check('password', 'el password debe ser minimo de 6 caracteres').isLength({ min: 6 }).exists(),
  check('confirmPassword', 'el password debe ser minimo de 6 caracteres').isLength({ min: 6 }).exists(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
]

export const validateLogin = [
  check("email", "agrega un email valido").isEmail(),

  (req, res, next) => {
    validateResult(req, res, next);
  },
]

export const validateProduct = [
  // Validación del campo de la categoría
  check('category').custom(async (category) => {
    const categoryExists = await Category.exists({ _id: category });
    console.log(categoryExists)
    if (!categoryExists) {
      throw new Error('La categoría especificada no existe');
    }
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
]