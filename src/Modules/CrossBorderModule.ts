import { Module } from '@nestjs/common';
import { CrossBorderController } from 'src/Controller/CrossBorderController';
import { CrossBorderService } from 'src/Services/CrossBorderService';
import { MongooseModule } from '@nestjs/mongoose';
import { CrossBorder, CrossBorderSchema } from 'src/Models/Entitys/Selection/CrossBorder';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: CrossBorder.name,
                schema: CrossBorderSchema,
            },
        ]),
    ],
    controllers: [CrossBorderController],
    providers: [CrossBorderService],
    exports: [CrossBorderService],
})
export class CrossBorderModule {}
