import express from 'express'
const usersRouter = express.Router()
import { loginValidator } from '~/middlewares/users.middlewares'
import { loginController } from '~/controllers/users.controller'

usersRouter.post('/login', loginValidator, loginController)

export default usersRouter
