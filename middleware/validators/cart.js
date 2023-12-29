import { check } from "express-validator";
import { validateResult } from "./validateResult";

// Crear una regla de validación personalizada para comprobar que la cantidad sea un número entero positivo
const isPositiveInteger = value => {
    return Number.isInteger(value) && value >= 0;
};


export const validateCart = [
    check('quantity')
        .exists().withMessage('La cantidad es requerida')
        .custom(isPositiveInteger).withMessage('La cantidad debe ser un número entero positivo'),

    (req, res, next) => {
        validateResult(req, res, next);
    },
]