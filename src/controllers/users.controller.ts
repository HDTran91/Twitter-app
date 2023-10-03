import { Request, Response } from 'express'
import User from '~/models/schemas/User.schema'
import usersService from '~/services/users.service'

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

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await usersService.register({ email, password })
    return res.json({
      message: 'Register success',
      result
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Register failed',
      error
    })
  }
}
