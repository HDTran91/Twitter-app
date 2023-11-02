import express from 'express'
const usersRouter = express.Router()
import {
  accessTokenValidation,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { loginController, logoutController, registerController } from '~/controllers/users.controller'
import { validate } from '~/utils/validation'
import { wrapRequestHandler } from '~/utils/handlers'

/**
 * description: login
 * path" /login
 * Method: POST
 * body: {email: string, password:string}
 */
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * description: register a new user
 * path" /register
 * Method: POST
 * body: {name: string, email: string, password:string,confirm_password: string,
 * date_of_birth: ISO8601}
 */
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
/**
 * description: logout user
 * Method: /logout
 * header: {Authorization: bearer <access_token>}
 * body: {refresh_token: string}
 */
usersRouter.post('/logout', accessTokenValidation, refreshTokenValidator, wrapRequestHandler(logoutController))

export default usersRouter
