import { NextFunction, Request, Response } from 'express'
import User from '~/models/schemas/User.schema'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.service'
import { RegisterReqBody } from '~/models/requests/users.requests'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'khoaiga0103@gmail.com' && password === '123124124') {
    res.json({
      message: 'Login Success'
    })
  }
  return res.status(400).json({
    error: 'Login failed'
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  throw new Error('Loi roi')
  const result = await usersService.register(req.body)
  return res.json({
    message: 'Register success',
    result
  })
}
