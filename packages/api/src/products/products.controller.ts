import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { Product, User } from '@trms/database'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UUIDParam } from '../common/decorators/uuid.decorator'
import { Authorized } from '../shared/auth'
import { UpdateProductDto } from './dto/update-product.dto'

@ApiTags('Product')
@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new product.',
  })
  async create(@Authorized() user: User, @Body() createDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createDto, user)
  }

  @Get('')
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll()
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Find a product by ID.',
  })
  async getUser(@UUIDParam('id') id: string): Promise<Product> {
    return this.productsService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a product by ID.',
  })
  async update(
    @Authorized() user: User,
    @UUIDParam('id') id: string,
    @Body() productDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, productDto, user)
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a product by ID.',
  })
  async remove(@Authorized() user: User, @Param('id') id: string) {
    return this.productsService.delete(id, user)
  }
}
