export enum UserVerifyStatus {
  Unverified,
  verified,
  Banned
}

export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}

export enum MediaType {
  Image,
  video
}

export enum TweetType {
  tweet,
  Retweet,
  comment,
  QuoteTweet
}

export enum TweetAudience {
  Everyone,
  TwitterCircle
}
