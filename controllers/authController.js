import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import User from '../models/User'
import Role from '../models/Role'

export const register = async (req, res) => {
    try {
        const { password, roles } = req.body

        let user = req.body

        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(password, salt)

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } })
            user.roles = foundRoles.map((role) => role._id);
        } else {
            const role = await Role.find({ name: "User" })
            user.roles = [role[0]._id];
        }

        const newUser = await User.create(user)
        const payload = { user: { id: newUser._id } };

        jwt.sign(payload, process.env.SECRETA, { expiresIn: 3600, },
            (error, token) => {
                if (error) throw error;

                //mensaje de confirmacion
                res.status(200).json({ token, msg: "se a registrado con exito" });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error" });

    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.find({ email })
        if (!user[0]) return res.status(400).json({ msg: "el usuario no existe" });

        const correctPass = await bcryptjs.compare(password, user[0].password);
        if (!correctPass) return res.status(401).json({ msg: "password incorrecto" });

        const payload = { user: { id: user[0]._id, role: user.role,  } };
        //firmar el JWT
        jwt.sign(
            payload, process.env.SECRETA, { expiresIn: 36000, },
            (error, token) => {
                if (error) throw error;

                //mensaje de confirmacion
                res.json({ token, msg: "se a logeado correctamente" });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error" });

    }
}