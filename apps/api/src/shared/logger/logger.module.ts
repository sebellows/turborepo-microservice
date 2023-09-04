import { Module } from '@nestjs/common'
import { Logger } from './logger'
import { ConfigModule } from '@nestjs/config'
import { LoggerConfigService } from './logger.config'

@Module({
  imports: [ConfigModule],
  providers: [Logger, LoggerConfigService],
  exports: [Logger],
})
export class LoggerModule {}
