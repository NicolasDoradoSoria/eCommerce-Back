import { Router } from "express";
import { getFavoriteProduct, postFavoriteProduct } from "../controllers/favoriteController"
import { verifyToken } from "../middleware/verifyToken";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

router.post("/", [verifyToken, isAdmin], postFavoriteProduct);
router.get("/", verifyToken, getFavoriteProduct);


module.exports = router;