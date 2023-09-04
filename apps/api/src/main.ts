import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import pkg from '../package.json'

import { AppModule } from './app.module'

import { config } from './shared/config'
import { Logger } from '@nestjs/common'
// import configuration from '../config/configuration'
// import { Logger } from './shared/logger'

declare const module: any

async function bootstrap() {
  // const logger = Logger.create({
  //   appName: config('appName'),
  //   appVersion: config('appVersion'),
  //   context: 'main',
  // })

  const app = await NestFactory.create(AppModule)

  const HOST = config('host', 'http://localhost')
  const TITLE = config('appTitle', pkg.name)
  const PORT = config('api.port', 5000)
  Logger.log('PORT', PORT)
  const VERSION = config('appVersion', '0.0.1')

  const builder = new DocumentBuilder()
    .setTitle(TITLE)
    .setDescription(`Api Docs for ${TITLE}`)
    .setVersion(VERSION)
    .build()

  const document = SwaggerModule.createDocument(app, builder)
  SwaggerModule.setup('docs', app, document)

  await app.listen(PORT)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

  Logger.log(`Server running on ${HOST}:${PORT}`)

  return app
}

bootstrap()
