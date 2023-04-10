import { Get, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/Models/Entitys/Product';
import { BaseService } from './BaseService';

@Injectable()
export class ProductService extends BaseService<Product> {
    constructor(@InjectModel('Product') productModel: Model<Product>) {
        super(productModel);
    }
    @Get('/list')
    getListProduct() {}
}
