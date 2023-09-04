import { Injectable } from '@nestjs/common'
import { Prisma, Product as ProductModel, User } from '@trms/database'

import { handleError } from '../common/errors'
import { isAdmin } from '../common/utils'
import { PrismaService } from '../shared/prisma'

import { CreateProductDto } from './dto/create-product.dto'

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateProductDto, user: User): Promise<ProductModel> {
    isAdmin(user)

    const data = createDto as Prisma.Without<
      Prisma.ProductUncheckedCreateInput,
      Prisma.ProductCreateInput
    > &
      Prisma.ProductCreateInput

    return await this.prisma.product.create({ data }).catch(handleError)
  }

  async findAll(): Promise<ProductModel[]> {
    return this.prisma.product.findMany()
  }

  async findOne(id: string): Promise<ProductModel> {
    return this.prisma.product.findUnique({ where: { id } })
  }

  async update(
    id: string,
    updateDto: Prisma.ProductUpdateInput,
    user: User,
  ): Promise<ProductModel> {
    isAdmin(user)

    return await this.prisma.product.update({ where: { id }, data: updateDto }).catch(handleError)
  }

  async delete(id: string, user: User): Promise<{ success: boolean; message: string }> {
    isAdmin(user)

    await this.findOne(id)

    await this.prisma.product.delete({
      where: { id },
    })

    const data = {
      success: true,
      message: 'Product deleted successfully',
    }

    return data
  }
}
