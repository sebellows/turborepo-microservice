import { ApiProperty } from '@nestjs/swagger'

export type AbstractModel = {
  id: string
  createdAt: Date
  updatedAt: Date
}

export class AbstractDto<TModel extends AbstractModel> {
  @ApiProperty()
  id: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  constructor(model: TModel, options?: { excludeFields?: boolean }) {
    if (!options?.excludeFields) {
      this.id = model.id
      this.createdAt = model.createdAt
      this.updatedAt = model.updatedAt
    }
  }
}
