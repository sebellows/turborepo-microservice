import { Injectable } from '@nestjs/common'
import { Prisma, Product as ProductModel, User } from '@trms/database'

import { DbService } from '../shared/db'
import { CreateProductDto } from './dto/create-product.dto'
import { handleError } from '../common/errors'
import { isAdmin } from '../common/utils'

@Injectable()
export class ProductsService {
  constructor(private readonly db: DbService) {}

  async create(createDto: CreateProductDto, user: User): Promise<ProductModel> {
    isAdmin(user)

    const data: Prisma.ProductCreateInput = createDto

    return await this.db.product.create({ data }).catch(handleError)
  }

  async findAll(): Promise<ProductModel[]> {
    return this.db.product.findMany()
  }

  async findOne(id: string): Promise<ProductModel> {
    return this.db.product.findUnique({ where: { id } })
  }

  async update(
    id: string,
    updateDto: Prisma.ProductUpdateInput,
    user: User,
  ): Promise<ProductModel> {
    isAdmin(user)

    return await this.db.product.update({ where: { id }, data: updateDto }).catch(handleError)
  }

  async delete(id: string, user: User): Promise<{ success: boolean; message: string }> {
    isAdmin(user)

    await this.findOne(id)

    await this.db.product.delete({
      where: { id },
    })

    const data = {
      success: true,
      message: 'Product deleted successfully',
    }

    return data
  }
}
