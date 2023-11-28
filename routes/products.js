import { Router } from "express"
import { deleteProductById, getProductById, productsList, postProducts, searchProducts, findProductsByOption } from "../controllers/productsController";
import { verifyToken } from "../middleware/verifyToken";
import { validateProduct } from "../middleware/validators/auth";
import { validateProductsByOption } from "../middleware/validators/products";
import { isAdmin } from "../middleware/isAdmin";


const router = Router();

router.post('/',[verifyToken, validateProduct, isAdmin], postProducts)
router.post('/searchProducts', productsList)
router.post('/searchOptions', validateProductsByOption, findProductsByOption)

router.get('/:productId', getProductById)
router.delete("/:productId",[verifyToken, isAdmin], deleteProductById)

module.exports = router;