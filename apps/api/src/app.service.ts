import { Injectable } from '@nestjs/common'
import { HealthCheckError, HealthIndicatorResult } from '@nestjs/terminus'

import { PrismaService } from './shared/prisma'

@Injectable()
export class AppService {
  constructor(private readonly client: PrismaService) {}

  getHello(): string {
    return 'Hello World!'
  }

  async healthCheck(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.client.$queryRaw`SELECT 1`
      return { [key]: { status: 'up' } }
      // return this.getStatus(key, true)
    } catch (e) {
      throw new HealthCheckError('Prisma check failed', e)
    }
  }
}
