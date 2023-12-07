import { config } from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
config()
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
  secure: true
});
export async function uploadImage(filePath) {

  return await cloudinary.uploader.upload(filePath, { folder: "products" })
}

export async function deleteImage(publicId) {
  return await cloudinary.uploader.destroy(publicId)
}