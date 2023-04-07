import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './Modules/ProductModule';

@Module({
    imports: [ConfigModule.forRoot(), MongooseModule.forRoot('mongodb://127.0.0.1:27017/tiki-clone'), ProductModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
