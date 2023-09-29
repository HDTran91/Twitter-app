import { Request, Response } from 'express'

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
