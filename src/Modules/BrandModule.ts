import { Module } from '@nestjs/common';
import { BrandController } from 'src/Controller/BrandController';
import { BrandService } from 'src/Services/BrandService';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from 'src/Models/Entitys/Selection/Brand';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Brand.name,
                schema: BrandSchema,
            },
        ]),
    ],
    controllers: [BrandController],
    providers: [BrandService],
    exports: [BrandService],
})
export class BrandModule {}
