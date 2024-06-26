import express from 'express'
const usersRouter = express.Router()
import {
  accessTokenValidator,
  changePasswordValidator,
  emailVerifyTokenValidator,
  followValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  unfollowValidator,
  updateMeValidator,
  verifiedUserValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import {
  changePasswordController,
  emailVerifyController,
  followController,
  forgotPasswordController,
  getMeController,
  getProfileController,
  loginController,
  logoutController,
  oauthController,
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  unfollowController,
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
 * description: OAuth with google
 * path" /oauth/google
 * Method: get
 * Query:{code:string}
 */
usersRouter.get('/oauth/google', wrapRequestHandler(oauthController))

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

/**
 * description: unfollow someone
 * path: /follow/user_id
 * method: delete
 * Header: {Authorization: bearer <access_token}
 */
usersRouter.delete(
  '/follow/:user_id',
  accessTokenValidator,
  verifiedUserValidator,
  unfollowValidator,
  wrapRequestHandler(unfollowController)
)

/**
 * description: change password
 * path: /change-password
 * method: put
 * Header: {Authorization: bearer <access_token}
 * body: {old_password: string, password: string, confirm_password: string}
 */
usersRouter.put(
  '/change-password',
  accessTokenValidator,
  verifiedUserValidator,
  changePasswordValidator,
  wrapRequestHandler(changePasswordController)
)
export default usersRouter
