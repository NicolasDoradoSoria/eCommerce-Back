import { Router } from "express";
import { createCarrousel, getCarrousel } from "../controllers/CarruselImage";
import { verifyToken } from "../middleware/verifyToken";
import { isAdmin } from "../middleware/isAdmin";
import fileUpload from 'express-fileupload'

const router = Router();

router.post("/",[verifyToken, isAdmin, fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads"
})], createCarrousel);
router.get("/", getCarrousel)


module.exports = router;
