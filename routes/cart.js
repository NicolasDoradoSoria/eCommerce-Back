import { Router } from "express"
import { deleteOrder, deleteProductCart, generateOrder, getCart, summary } from "../controllers/cartController";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post("/", verifyToken , generateOrder);
router.post("/summary", verifyToken, summary);
router.get("/", verifyToken, getCart);
router.delete("/",verifyToken, deleteOrder);
router.delete("/:idCart",verifyToken, deleteProductCart);
module.exports = router;
