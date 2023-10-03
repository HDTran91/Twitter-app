import express from 'express'
const usersRouter = express.Router()
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { loginController, registerController } from '~/controllers/users.controller'
import { validate } from '~/utils/validation'

usersRouter.post('/login', loginValidator, loginController)

/**
 * description: register a new user
 * path" /register
 * Method: POST
 * body: {name: string, email: string, password:string,confirm_password: string,
 * date_of_birth: ISO8601}
 */
usersRouter.post('/register', registerValidator, registerController)

export default usersRouter
