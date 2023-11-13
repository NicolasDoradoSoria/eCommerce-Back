import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { createCategory, deleteCategory, getCategories } from "../controllers/categoryController";
import {validateCategory} from '../middleware/validators/category'
const router = Router();

router.post("/", [verifyToken, validateCategory], createCategory);
router.delete("/:categoryId", [verifyToken], deleteCategory);
router.get("/", getCategories);

module.exports = router;
