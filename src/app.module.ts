import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './Modules/ProductModule';
import { CategoryModule } from './Modules/CategoryModule';
import { FilterSelectionModule } from './Modules/FilterSelectionModule';
import { ColorModule } from './Modules/ColorModule';
import { BrandModule } from './Modules/BrandModule';
import { SellerModule } from './Modules/SellerModule';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/tiki-clone'),
        ProductModule,
        CategoryModule,
        FilterSelectionModule,
        ColorModule,
        BrandModule,
        SellerModule,
    ],
})
export class AppModule {}
