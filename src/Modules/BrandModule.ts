import { Module } from '@nestjs/common';
import { BrandController } from 'src/Controller/BrandController';
import { BrandService } from 'src/Services/BrandService';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandSchema } from 'src/Models/Entitys/Selection/Brand';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Brand',
                schema: BrandSchema,
            },
        ]),
    ],
    controllers: [BrandController],
    providers: [BrandService],
})
export class BrandModule {}
