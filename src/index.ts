import express from 'express'
import userRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'

//connect to database
databaseService.connect()
const app = express()
const port = 4000

app.use(express.json())
app.use('/users', userRouter)

//error handler

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Hello! Gacon, I am running at the port ${port} `)
})
