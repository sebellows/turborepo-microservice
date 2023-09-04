import { SetMetadata } from '@nestjs/common'
import { ClassConstructor } from 'class-transformer'

export const ResponseContextKey = '@context'

export const ResponseContext = (ctor: ClassConstructor<any>) =>
  SetMetadata(ResponseContextKey, ctor)
