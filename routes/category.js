import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { createCategory, deleteCategory, getCategories } from "../controllers/categoryController";
import {validateCategory} from '../middleware/validators/category'
import { isAdmin } from "../middleware/isAdmin";
const router = Router();

router.post("/", [verifyToken, validateCategory, isAdmin], createCategory);
router.delete("/:categoryId", [verifyToken], deleteCategory);
router.get("/", getCategories);

module.exports = router;
