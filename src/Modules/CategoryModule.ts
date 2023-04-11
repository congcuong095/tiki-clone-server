import { Module } from '@nestjs/common';
import { CategoryController } from 'src/Controller/CategoryController';
import { CategoryService } from 'src/Services/CategoryService';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/Models/Entitys/Category';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Category.name,
                schema: CategorySchema,
            },
        ]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
