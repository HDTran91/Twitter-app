import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/mesages'

type ErrorsType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>

//{[key:string]: string}

export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

export class EntityError extends ErrorWithStatus {
  errors: ErrorsType
  // eslint-disable-next-line prettier/prettier
  constructor({ message = USERS_MESSAGES.VALIDATION_ERROR, errors }: { message?: string, errors: ErrorsType }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }

}