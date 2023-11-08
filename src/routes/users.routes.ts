import express from 'express'
const usersRouter = express.Router()
import {
  accessTokenValidation,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import {
  emailVerifyController,
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
  resendVerifyEmailController,
  verifyForgotPasswordController
} from '~/controllers/users.controller'
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

/**
 * description: verify email when user click on the link
 * path: /verify-email
 * method: post
 * body: {refresh_token: string}
 */
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(emailVerifyController))

/**
 * description: resend verify email when user ask a verified email again
 * path: /resend-verify-email
 * method: post
 * Header: {Authorization: bearer <access_token}
 * body: {}
 */
usersRouter.post('/resend-verify-email', accessTokenValidation, wrapRequestHandler(resendVerifyEmailController))

/**
 * description: submit email to reset password
 * path: /forgot-password
 * method: post
 * body: {forgot_password_token: string}
 */
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

/**
 * description: verify link in email to reset password
 * path: /verify-forgot-password
 * method: post
 * body: {email: string}
 */
usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPasswordController)
)
export default usersRouter
