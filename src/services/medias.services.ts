import { Request } from 'express'
import sharp from 'sharp'
import path from 'path'
import { getNameFromFullname, handleUploadSingleImage } from '~/utils/file'
import { UPLOAD_DIR } from '~/constants/dir'
import fs from 'fs'
import { isProduction } from '~/utils/config'
import { config } from 'dotenv'

config()
class MediasService {
  async handleUploadSingleImage(req: Request) {
    const file = await handleUploadSingleImage(req)
    const newName = getNameFromFullname(file.newFilename)
    const newPath = path.resolve(UPLOAD_DIR, `${newName}.jpg`)
    // console.log(newPath)
    await sharp(file.filepath).jpeg().toFile(newPath)
    //unlink path to the file we just uploaded
    fs.unlinkSync(file.filepath)
    return isProduction
      ? `${process.env.HOST}/static/${newName}.jpg}`
      : `http://localhost:${process.env.PORT}/static/${newName}.jpg`
  }
}
const mediasService = new MediasService()
export default mediasService
