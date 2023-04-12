import { Module } from '@nestjs/common';
import { CategoryController } from 'src/Controller/CategoryController';
import { CategoryService } from 'src/Services/CategoryService';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/Models/Entitys/Category';
import { ColorService } from 'src/Services/ColorService';
import { ColorModule } from './ColorModule';
import { BrandModule } from './BrandModule';
import { SellerModule } from './SellerModule';
import { CrossBorderModule } from './CrossBorderModule';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Category.name,
                schema: CategorySchema,
            },
        ]),
        ColorModule,
        BrandModule,
        SellerModule,
        CrossBorderModule,
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService],
})
export class CategoryModule {}
