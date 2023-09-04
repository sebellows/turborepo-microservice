import { Global, Module, Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
// import { PassportModule } from '@nestjs/passport'

import configuration from '../../config/configuration'

// import { Logger } from './logger'
import { JwtStrategy } from './auth'
import { PrismaModule, PrismaService } from './prisma'
// import { DbService } from './db'
// import { DbModule } from './db/db.module'

const providers: Provider[] = [PrismaService, JwtStrategy]

@Global()
@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // LoggerModule,
    // AuthModule,
    // PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [PrismaService, JwtStrategy],
  exports: [...providers],
})
export class SharedModule {}
