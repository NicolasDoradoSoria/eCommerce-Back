import { Router } from "express";
import { deleteFavoriteProduct, getFavoriteProduct, postFavoriteProduct } from "../controllers/favoriteController"
import { verifyToken } from "../middleware/verifyToken";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

router.post("/", [verifyToken, isAdmin], postFavoriteProduct);
router.get("/", verifyToken, getFavoriteProduct);
router.delete("/:productId", verifyToken, deleteFavoriteProduct);


module.exports = router;