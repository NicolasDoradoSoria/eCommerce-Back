import { uploadCarrouselImage, uploadImage } from "../config/cloudinary";
import CarruselImage from "../models/CarruselImage";
import fs from 'fs-extra';

export const createCarrousel = async (req, res) => {

    try {
        if (!req.files.image) return res.status(404).json({ msg: "la imagen no existe" })

        // // Subir imágenes si existen en la solicitud
        const result = await uploadCarrouselImage(req.files.image.tempFilePath)
        const carrouselImageNew = { public_id: result.public_id, secure_url: result.secure_url }

        // // Eliminar imágenes temporales después de la carga
        console.log(carrouselImageNew)
        CarruselImage.create(carrouselImageNew)
        await fs.unlink(req.files.image.tempFilePath)
        return res.status(201).json({ msg: 'image Upsloaded Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });

    }
}

export const getCarrousel = async (req, res) => {
    try {
        const images = await CarruselImage.find({});
        
        res.json({ images });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
    }
}