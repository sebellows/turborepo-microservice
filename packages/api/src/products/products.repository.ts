import { Injectable } from '@nestjs/common'
import { Prisma, Product as ProductModel } from '@trms/database'

import { DbService } from '../shared/db'

@Injectable()
export class ProductsRepository {
  constructor(private db: DbService) {}

  async create(data: Prisma.ProductCreateInput): Promise<ProductModel> {
    return this.db.product.create({ data })
  }

  async findAll(): Promise<ProductModel[]> {
    return this.db.product.findMany()
  }

  async findOne(id: string): Promise<ProductModel> {
    return this.db.product.findUnique({ where: { id: String(id) } })
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<ProductModel> {
    return this.db.product.update({ where: { id }, data })
  }

  async delete(id: string): Promise<void> {
    this.db.product.delete({ where: { id } })
  }
}
