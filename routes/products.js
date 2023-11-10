import { Router } from "express"
import { getProductById, getProducts, postProducts } from "../controllers/productsController";
import { verifyToken } from "../middleware/verifyToken";
import { uploadMulti } from "../middleware/uploaderMiddleware";


const router = Router();

router.post('/',verifyToken, postProducts)
router.get('/', getProducts)
router.get('/:productId', getProductById)


module.exports = router;