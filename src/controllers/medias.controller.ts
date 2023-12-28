import { NextFunction, Request, Response } from 'express'
import path from 'path'
import mediasService from '~/services/medias.services'
import { handleUploadSingleImage } from '~/utils/file'

// console.log(path.resolve('uploads'))
export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await mediasService.handleUploadSingleImage(req)
  return res.json({
    result: result
  })
}
