import { Logger } from '@nestjs/common'
import { prismaDefineExtension } from '@trms/database'

/**
 * NOTE: The path forward for Nestjs/Prisma v5+ integration is still unclear, as the
 * previous way for registering middleware with Prisma was deprecated. The current
 * documentation requires extensions, but how those are registered in Nestjs is unclear.
 * The below implementation is based on several comments in the unresolved issue addressed
 * on Prisma repository's Git Issues forum.
 * @see Issue {@link https://github.com/prisma/prisma/issues/18628}
 * @see {@link https://github.com/prisma/prisma/issues/18628#issuecomment-1650341785}
 */

export const loggingMiddleware = prismaDefineExtension({
  query: {
    $allModels: {
      async $allOperations({ operation, model, args, query }) {
        const startTime = Date.now()
        const result = await query(args)
        const endTime = Date.now()
        const executionTime = endTime - startTime

        Logger.debug(`${model}.${operation}(${JSON.stringify(args)}) took ${executionTime}ms`)

        return result
      },
    },
  },
})
