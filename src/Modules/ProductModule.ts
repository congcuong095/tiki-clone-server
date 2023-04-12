import { Module } from '@nestjs/common';
import { ProductController } from 'src/Controller/ProductController';
import { ProductService } from 'src/Services/ProductService';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/Models/Entitys/Product';
import { CategoryModule } from './CategoryModule';
import { ColorModule } from './ColorModule';
import { BrandModule } from './BrandModule';
import { SellerModule } from './SellerModule';
import { CrossBorderModule } from './CrossBorderModule';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Product.name,
                schema: ProductSchema,
            },
        ]),
        CategoryModule,
        ColorModule,
        BrandModule,
        SellerModule,
        CrossBorderModule,
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
