import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { Product, User } from '@trms/database'

import { UUIDParam } from '../common/decorators/uuid.decorator'
import { Public } from '../common/decorators/public-route.decorator'
import { Authorized } from '../shared/auth'

import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Find a product by ID.',
  })
  async getUser(@UUIDParam('id') id: string): Promise<Product> {
    return this.productsService.findOne(id)
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Get all products.',
  })
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll()
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new product.',
  })
  async create(@Authorized() user: User, @Body() createDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createDto, user)
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a product by ID.',
  })
  async remove(@Authorized() user: User, @Param('id') id: string) {
    return this.productsService.delete(id, user)
  }
}
