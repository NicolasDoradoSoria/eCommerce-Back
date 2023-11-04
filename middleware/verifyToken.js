import jwt from 'jsonwebtoken'
import User from "../models/User"

export const verifyToken = async (req, res, next) => {
  //leer el token del header
  const token = req.header('x-auth-token')
  //revisar si no hay token
  if (!token) {
    return res.status(403).json({ msg: 'no hay token, permiso no valido' })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETA)
    req.userId = decoded.user.id
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });
    next()
  } catch (error) {
    res.status(401).json({ msg: "token no valido" })
  }
  //validar el token
}


