import { Module } from '@nestjs/common';
import { SellerController } from 'src/Controller/SellerController';
import { SellerService } from 'src/Services/SellerService';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerSchema } from 'src/Models/Entitys/Selection/Seller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Seller',
                schema: SellerSchema,
            },
        ]),
    ],
    controllers: [SellerController],
    providers: [SellerService],
})
export class SellerModule {}
