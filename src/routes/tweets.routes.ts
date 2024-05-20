import { Router } from 'express'
import { createTweetController } from '~/controllers/tweets.controller'
import { createTweerValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, loginValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const tweetsRouter = Router()

tweetsRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  createTweerValidator,
  wrapRequestHandler(createTweetController)
)

export default tweetsRouter
