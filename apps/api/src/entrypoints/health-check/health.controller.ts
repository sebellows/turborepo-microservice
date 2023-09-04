// import { Controller, Get } from '@nestjs/common'
// import { ApiExcludeEndpoint } from '@nestjs/swagger'
// import { HealthCheckError, HealthCheckService, HealthIndicatorResult } from '@nestjs/terminus'
// import { DbService } from '../../shared/db'
// import { DbHealthIndicator } from './health.db'
// import { ConfigService } from '@nestjs/config'
// // import { HealthService } from './health.service'

// @Controller()
// export class HealthController {
//   constructor(
//     private readonly config: ConfigService,
//     private readonly health: HealthCheckService,
//     private readonly prisma: DbHealthIndicator,
//     private readonly client: DbService,
//   ) {}

//   // @ApiExcludeEndpoint()
//   // @Get('/live')
//   // healthCheck(): object {
//   //   return this.health.getLive()
//   // }

//   @ApiExcludeEndpoint()
//   @Get('/ready')
//   async readyCheck(): Promise<any> {
//     return this.health.check([
//       () => this.prisma.healthCheck(this.config.get('db.name', 'postgres')),
//     ])
//   }
// }
