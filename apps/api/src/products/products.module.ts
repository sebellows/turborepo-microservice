import { Module, forwardRef } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { SharedModule } from '../shared/shared.module'

@Module({
  imports: [forwardRef(() => SharedModule)],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
