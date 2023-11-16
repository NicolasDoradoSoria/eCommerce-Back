import { Router } from "express";
import { getFavoriteProduct, postFavoriteProduct } from "../controllers/favoriteController"
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post("/", verifyToken, postFavoriteProduct);
router.get("/", verifyToken, getFavoriteProduct);


module.exports = router;