import { Router } from "express"
import { deleteProductById, getProductById, productsList, postProducts, searchProducts } from "../controllers/productsController";
import { verifyToken } from "../middleware/verifyToken";
import { validateProduct } from "../middleware/validators/auth";


const router = Router();

router.post('/',[verifyToken, validateProduct], postProducts)
router.post('/searchProducts', productsList)
router.get('/:productId', getProductById)
router.delete("/:productId",[verifyToken], deleteProductById)

module.exports = router;