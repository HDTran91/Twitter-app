import { Router } from 'express'
import { uploadImageController } from '~/controllers/medias.controller'
import { wrapRequestHandler } from '~/utils/handlers'
const mediasRouter = Router()

//upload 1 image
mediasRouter.post('/upload-image', wrapRequestHandler(uploadImageController))

export default mediasRouter
