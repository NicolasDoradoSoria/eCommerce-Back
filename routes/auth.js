import { Router } from "express"
import { login, register } from "../controllers/authController";
import { validateLogin, validateRegister } from "../middleware/validators/auth";
import { checkDuplicateEmail, comparePasswords } from "../middleware/verifySignup";
const router = Router();

router.post('/register', validateRegister, checkDuplicateEmail, comparePasswords, register)
router.post("/login", validateLogin, login);

module.exports = router;
