import { Request } from 'express'
import sharp from 'sharp'
import path from 'path'
import { getNameFromFullname, handleUploadImage } from '~/utils/file'
import { UPLOAD_DIR } from '~/constants/dir'
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
        const newPath = path.resolve(UPLOAD_DIR, `${newName}.jpg`)
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
}
const mediasService = new MediasService()
export default mediasService
