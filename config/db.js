//coneccion a mongoDB
import mongoose from 'mongoose'
import config from './config'
(async () => {
    try {
        await mongoose.connect(config.mongodbURL)
        console.log("******DB CONECTADA******")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
})()