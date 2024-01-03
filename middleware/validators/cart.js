import { check } from "express-validator";
import { validateResult } from "./validateResult";

// Crear una regla de validación personalizada para comprobar que la cantidad sea un número entero positivo
const isPositiveInteger = value => {
    return Number.isInteger(value) && value >= 0;
};

