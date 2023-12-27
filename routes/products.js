import { Router } from "express"
import { deleteProductById, getProductById, productsList, postProducts, searchProducts, findProductsByOption, searchOption } from "../controllers/productsController";
import { verifyToken } from "../middleware/verifyToken";
import { validateProduct } from "../middleware/validators/auth";
import { isAdmin } from "../middleware/isAdmin";
import fileUpload from 'express-fileupload'
import { validateProductsByOption } from "../middleware/validators/products";

const router = Router();

router.post('/',[verifyToken, validateProduct, isAdmin, fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads"
})], postProducts)
router.post('/searchProducts', productsList)
router.post('/searchOptions', findProductsByOption)
router.get('/searchOptions', searchOption)
router.get('/:productId', getProductById)
router.delete("/:productId",[verifyToken, isAdmin, fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads"
})], deleteProductById)

module.exports = router;