import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class ExceptionService {
  handleAuthTokenException() {
    throw new HttpException('api.genericInternalError', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  handleHashException() {
    throw new HttpException('api.genericInternalError', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  handleCreateUserException() {
    throw new HttpException('api.createUserError', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  handleLoginUserException() {
    throw new HttpException('api.loginUserError', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  handleExistUserException() {
    throw new HttpException('api.userAlreadyExistError', HttpStatus.UNPROCESSABLE_ENTITY)
  }

  handleMismatchPasswordException() {
    throw new HttpException('api.userMismatchPassword', HttpStatus.UNPROCESSABLE_ENTITY)
  }

  resolveInheritException(err: unknown) {
    if (err instanceof HttpException) {
      throw err
    }
  }
}
