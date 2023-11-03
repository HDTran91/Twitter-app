import { NextFunction, Request, Response } from 'express'
import User from '~/models/schemas/User.schema'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.service'
import { LogoutReqBody, RegisterReqBody, TokenPayload } from '~/models/requests/users.requests'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.services'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'

export const loginController = async (req: Request, res: Response) => {
  const user = req.user as User
  // console.log(user)
  const user_id = user._id
  // console.log(user_id)
  const result = await usersService.login(user_id.toString())
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await usersService.register(req.body)
    return res.json({
      message: USERS_MESSAGES.REGISTER_SUCCESS,
      result
    })
  } catch (error) {
    next(error)
  }
}

export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token)
  return res.json(result)
}

export const emailVerifyValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_email_verify_token as TokenPayload
  const user = await databaseService.users.findOne({
    _id: new ObjectId(user_id)
  })
  // no user return error
  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }

  //already verified return status Ok with message already verified
  if (user.email_verify_token === '') {
    return res.json({
      message: USERS_MESSAGES.EMAIL_VERIFIED
    })
  }
  const result = await usersService.verifyEmail(user_id)
  return res.json ({
    message: USERS_MESSAGES.EMAIL_VERIFY_SUCCESS,
    result
  })
}
