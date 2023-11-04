import User from "../models/User"

export const checkDuplicateEmail = async (req, res, next) => {

    const email = await User.findOne({ email: req.body.email })
    if (email) return res.status(400).json({ message: "the email already exists" })
    next()
}

export const comparePasswords = async (req, res, next) => {
    const { password, confirmPassword } = req.body;
    // compara las dos contraseñas 
    if (password !== confirmPassword) return res.status(400).json({ msg: "las contraseñas no coinciden!" })

    next()
}