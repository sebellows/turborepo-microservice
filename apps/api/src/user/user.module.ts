import { Module, forwardRef } from '@nestjs/common'

import { UserService } from './user.service'
import { UserController } from './user.controller'
import { SharedModule } from '../shared/shared.module'

@Module({
  imports: [forwardRef(() => SharedModule)],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
