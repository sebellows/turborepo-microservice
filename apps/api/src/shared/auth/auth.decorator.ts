import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@trms/database'

export const Authorized = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const user: User = request.user

  delete user.password

  return user
})
