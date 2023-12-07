import cors from 'cors'
import morgan from "morgan"
import express from "express"
import routes from "./routes"
import { Roles } from './data/Roles'
import fileUpload from 'express-fileupload'
const app = express()
Roles()

app.use(cors())
app.set("port", 4000)
app.use(morgan("dev"))

// habilitar express.json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//rutas
app.use("/api", routes)

//carpeta publica
app.use(express.static('uploads'))
 
export default app