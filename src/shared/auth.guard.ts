import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpService,
  HttpStatus,
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const jsonWebToken = request.headers.authorization
    if (!jsonWebToken) return false
    request.user = this.validateToken(jsonWebToken)
    return true
  }

  validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      return new HttpException('Invalid token', HttpStatus.FORBIDDEN)
    }

    const token = auth.split(' ')[1]

    try {
      const decode = jwt.verify(token, process.env.SECRET)
      return decode
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name)
      throw new HttpException(message, HttpStatus.FORBIDDEN)
    }
  }
}
