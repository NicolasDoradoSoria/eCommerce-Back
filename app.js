import cors from 'cors'
import morgan from "morgan"
import express from "express"
import routes from "./routes"

const app = express()

app.use(cors())
app.set("port", 4000)
app.use(morgan("dev"))

// habilitar express.json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//rutas
app.use("/api", routes)


export default app