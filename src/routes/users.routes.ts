import express from 'express'
const usersRouter = express.Router()
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  followValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  updateMeValidator,
  verifiedUserValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import {
  emailVerifyController,
  followController,
  forgotPasswordController,
  getMeController,
  getProfileController,
  loginController,
  logoutController,
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  updateMeController,
  verifyForgotPasswordController
} from '~/controllers/users.controller'
import { validate } from '~/utils/validation'
import { wrapRequestHandler } from '~/utils/handlers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import { UpdateMeReqBody } from '~/models/requests/users.requests'

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
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

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
usersRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))

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

/**
 * description: reset password
 * path: /reset-password
 * method: post
 * body: {forgot_password_token: string, password: string, confirm_password: string}
 */
usersRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))

/**
 * description: get my profile
 * path: /me
 * method: get
 * Header: {Authorization: Bearer <access_token}
 */
usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))

/**
 * description: Update my profile
 * path: /me
 * method: PATCH
 * Header: {Authorization: Bearer <access_token}
 * Body: UserSchema
 */
usersRouter.patch(
  '/me',
  accessTokenValidator,
  verifiedUserValidator,
  updateMeValidator,
  filterMiddleware<UpdateMeReqBody>([
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'username',
    'avatar',
    'cover_photo'
  ]),
  wrapRequestHandler(updateMeController)
)

/**
 * description: get user profile
 * path: /:username
 * method: get
 */
usersRouter.get('/:username', wrapRequestHandler(getProfileController))

/**
 * description: follow someone
 * path: /follow
 * method: post
 * Header: {Authorization: bearer <access_token}
 * body: {followed_user_id: string}
 */
usersRouter.post(
  '/follow',
  accessTokenValidator,
  verifiedUserValidator,
  followValidator,
  wrapRequestHandler(followController)
)
export default usersRouter
