import { Router } from "express"
import { deleteProductById, getProductById, getProducts, postProducts } from "../controllers/productsController";
import { verifyToken } from "../middleware/verifyToken";


const router = Router();

router.post('/',verifyToken, postProducts)
router.get('/', getProducts)
router.get('/:productId', getProductById)
router.delete("/:productId",[verifyToken], deleteProductById)

module.exports = router;