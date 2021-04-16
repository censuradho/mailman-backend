import multer from 'multer'

import cloudinaryConfig from './cloudinary'

function uploadMulter () {
  return multer({ 
    storage: cloudinaryConfig() 
  })
}

export default uploadMulter