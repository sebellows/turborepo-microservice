import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit, Optional } from '@nestjs/common'

import { PRISMA_SERVICE_OPTIONS } from './prisma.constants'
import { PrismaServiceOptions } from './prisma.types'
import { Client } from '@trms/database'
import { config } from '../config'
import { loggingMiddleware } from './prisma-logging.middleware'

@Injectable()
export class PrismaService extends Client implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Optional()
    @Inject(PRISMA_SERVICE_OPTIONS)
    private readonly prismaServiceOptions: PrismaServiceOptions = {},
  ) {
    super({
      log: ['query', 'error', 'info', 'warn'],
      datasources: {
        db: { url: config('database.url') },
      },
      ...prismaServiceOptions.prismaOptions,
    })

    this.$extends(loggingMiddleware)
  }

  async onModuleInit() {
    await this.$connect()
    Logger.log('DB connection established')
  }

  async onModuleDestroy() {
    await this.$disconnect()
    Logger.log('DB connection closed')
  }
}
