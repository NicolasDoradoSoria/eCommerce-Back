import { Router } from "express"
import { getProducts, postProducts } from "../controllers/productsController";
import { verifyToken } from "../middleware/verifyToken";


const router = Router();

router.post('/',verifyToken, postProducts)
router.get('/', getProducts)


module.exports = router;