import {
  DynamicModule,
  InjectionToken,
  Module,
  OptionalFactoryDependency,
  Provider,
} from '@nestjs/common'

import { PrismaService } from './prisma.service'
import { PRISMA_SERVICE_OPTIONS } from './prisma.constants'
import { PrismaModuleAsyncOptions, PrismaModuleOptions, PrismaOptionsFactory } from './prisma.types'

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  static forRoot(options: PrismaModuleOptions = {}): DynamicModule {
    return {
      global: options.isGlobal,
      module: PrismaModule,
      providers: [
        {
          provide: PRISMA_SERVICE_OPTIONS,
          useValue: options.prismaServiceOptions,
        },
      ],
    }
  }

  static forRootAsync(options: PrismaModuleAsyncOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: PrismaModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
    }
  }

  private static createAsyncProviders(options: PrismaModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return this.createAsyncOptionsProvider(options)
    }

    return [
      ...(this.createAsyncOptionsProvider(options) as Provider[]),
      {
        provide: options.useClass,
        useClass: options.useClass,
      } as Provider,
    ]
  }

  private static createAsyncOptionsProvider(options: PrismaModuleAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: PRISMA_SERVICE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ]
    }
    return [
      {
        provide: PRISMA_SERVICE_OPTIONS,
        useFactory: async (optionsFactory: PrismaOptionsFactory) =>
          await optionsFactory.createPrismaOptions(),
        inject: [
          (options.useExisting || options.useClass) as InjectionToken | OptionalFactoryDependency,
        ],
      },
    ]
  }
}
