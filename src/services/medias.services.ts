import { Request } from 'express'
import sharp from 'sharp'
import path from 'path'
import { getNameFromFullname, handleUploadImage, handleUploadVideo } from '~/utils/file'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import fs from 'fs'
import { isProduction } from '~/utils/config'
import { config } from 'dotenv'
import { MediaType } from '~/constants/enums'
import { Media } from '~/models/other'

config()
class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename)
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
        // console.log(newPath)
        await sharp(file.filepath).jpeg().toFile(newPath)
        //unlink path to the file we just uploaded
        fs.unlinkSync(file.filepath)
        return {
          url: isProduction
            ? `${process.env.HOST}/static/${newName}.jpg}`
            : `http://localhost:${process.env.PORT}/static/${newName}.jpg`,
          type: MediaType.Image
        }
      })
    )
    return result
  }
  async uploadVideo(req: Request) {
    const files = await handleUploadVideo(req)
    const { newFilename } = files[0]

    const result: Media[] = files.map((file)=> {
      return {
        url: isProduction
          ? `${process.env.HOST}/static/video/${file.newFilename}}`
          : `http://localhost:${process.env.PORT}/static/video/${file.newFilename}`,
        type: MediaType.video
      }
    })
    return result
  }
}
const mediasService = new MediasService()
export default mediasService
