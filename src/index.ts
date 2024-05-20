import express from 'express'
import userRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_IMAGE_DIR } from './constants/dir'
import staticRouter from './routes/static.routes'

config()
//connect to database
databaseService.connect()
const app = express()
const port = process.env.PORT || 4000

//create folder upload
initFolder()

app.use(express.json())
app.use('/users', userRouter)
app.use('/medias', mediasRouter)
app.use('/static', staticRouter)
// app.use('/static', express.static(UPLOAD_IMAGE_DIR))

//error handler

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Hello! Gacon, I am running at the port ${port} `)
})
