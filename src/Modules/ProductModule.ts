import { Module } from '@nestjs/common';
import { ProductController } from 'src/Controller/ProductController';
import { ProductService } from 'src/Services/ProductService';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/Models/Entitys/Product';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Product.name,
                schema: ProductSchema,
            },
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
