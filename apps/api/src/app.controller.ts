import { Controller, Get } from '@nestjs/common'
// import { ApiExcludeEndpoint } from '@nestjs/swagger'
// import { HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus'
// import { ConfigService } from '@nestjs/config'

import { AppService } from './app.service'
// import { DbService } from './shared/db'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, // private readonly config: ConfigService, // private readonly health: HealthCheckService,
  ) // private readonly prismaHealth: PrismaHealthIndicator,
  // private readonly client: DbService,
  {}

  @Get('')
  getHello(): string {
    return this.appService.getHello()
  }

  // @ApiExcludeEndpoint()
  // @Get('/ready')
  // async readyCheck(): Promise<any> {
  //   return this.health.check([
  //     () => this.prismaHealth.pingCheck(this.config.get('db.name', 'postgres'), this.client),
  //     // () => this.prismaHealthIndicator.pingCheck('readOnlyDb', this.readOnlyPrisma),
  //     // async () => {
  //     //   return {
  //     //     redis: {
  //     //       status: this.cache.store.client.status === 'ready' ? 'up' : 'down',
  //     //     },
  //     //   }
  //     // },
  //   ])
  // }
}
