import { Router } from "express"
import { deleteProductById, getProductById, getProducts, postProducts, searchProducts } from "../controllers/productsController";
import { verifyToken } from "../middleware/verifyToken";
import { validateProduct } from "../middleware/validators/auth";


const router = Router();

router.post('/',[verifyToken, validateProduct], postProducts)
router.post('/searchProducts', getProducts)
router.get('/:productId', getProductById)
router.delete("/:productId",[verifyToken], deleteProductById)
router.post("/searchProducts", searchProducts);

module.exports = router;