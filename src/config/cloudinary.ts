import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v4 as uuid } from 'uuid'

function cloudinaryConfig () {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  return new CloudinaryStorage({ 
    cloudinary,
    params: async (req, file) => {

      return {
        folder: 'uploads',
        public_id: `${file.fieldname}-${uuid()}`
      }
    }
  })
}

export default cloudinaryConfig
