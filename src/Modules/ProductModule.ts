import { Module } from '@nestjs/common';
import { ProductController } from 'src/Controller/ProductController';
import { ProductService } from 'src/Services/ProductService';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/Models/Entitys/Product';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Product',
                schema: ProductSchema,
            },
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
