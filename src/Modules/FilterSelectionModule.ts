import { Module } from '@nestjs/common';
import { FilterSelectionController } from 'src/Controller/FilterSelectionController';
import { FilterSelectionService } from 'src/Services/FilterSelectionService';
import { MongooseModule } from '@nestjs/mongoose';
import { FilterSelectionSchema } from 'src/Models/Entitys/FilterSelection';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'FilterSelection',
                schema: FilterSelectionSchema,
            },
        ]),
    ],
    controllers: [FilterSelectionController],
    providers: [FilterSelectionService],
})
export class FilterSelectionModule {}
