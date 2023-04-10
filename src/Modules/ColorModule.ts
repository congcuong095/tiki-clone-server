import { Module } from '@nestjs/common';
import { ColorController } from 'src/Controller/ColorController';
import { ColorService } from 'src/Services/ColorService';
import { MongooseModule } from '@nestjs/mongoose';
import { ColorSchema } from 'src/Models/Entitys/Selection/Color';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Color',
                schema: ColorSchema,
            },
        ]),
    ],
    controllers: [ColorController],
    providers: [ColorService],
})
export class ColorModule {}
