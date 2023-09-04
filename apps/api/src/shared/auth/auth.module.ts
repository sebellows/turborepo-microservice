import { Module } from '@nestjs/common'
// import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

// import { AuthService } from './auth.service'
// import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { PrismaModule } from '../prisma'

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.register({
    //   secret: process.env.AUTH_CLIENT_SECRET,
    //   signOptions: { expiresIn: '24h' },
    // }),
  ],
  // controllers: [AuthController],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
