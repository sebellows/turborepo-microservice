import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import configuration from '../../config/configuration'

import { DbModule } from './db'
import { LoggerModule } from './logger'
import { AuthModule } from './auth'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    DbModule,
    LoggerModule,
  ],
})
export class SharedModule {}
