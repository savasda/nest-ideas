import { createParamDecorator } from '@nestjs/common'
export const User = createParamDecorator((data, context) => {
  const request = context.switchToHttp().getRequest()
  return data ? request.user[data] : request.user
})
