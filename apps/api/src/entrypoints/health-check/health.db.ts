// import { Injectable } from '@nestjs/common'
// import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus'

// import { DbService } from '../../shared/db'

// @Injectable()
// export class DbHealthIndicator extends HealthIndicator {
//   constructor(private readonly client: DbService) {
//     super()
//   }

//   async healthCheck(key: string): Promise<HealthIndicatorResult> {
//     try {
//       await this.client.$queryRaw`SELECT 1`
//       return this.getStatus(key, true)
//     } catch (e) {
//       throw new HealthCheckError('Prisma check failed', e)
//     }
//   }
// }
