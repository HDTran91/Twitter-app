import express, { Request, Response, NextFunction } from 'express'
import userRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'

const app = express()
const port = 3000

app.use(express.json())
app.use('/users', userRouter)

//connect to database
databaseService.connect()

//error handler

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Loi la: ", err.message)
  res.status(400).json({error: err.message})
})

app.listen(port, () => {
  console.log(`Hello! Gacon, I am running at the port ${port} `)
})
