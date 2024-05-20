import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TweetRequestBody } from '~/models/requests/tweets.request'

export const createTweetController = async (req: Request<ParamsDictionary, any, TweetRequestBody>, res: Response) => {
  return res.send('createTweetController')
}
