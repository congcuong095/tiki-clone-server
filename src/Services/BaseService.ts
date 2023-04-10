import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/Models/Entitys/Product';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private productModel: Model<Product>) {}

    async create(data: any): Promise<any> {
        const createData = new this.productModel(data);
        return createData.save();
    }
    async get(id: any): Promise<any> {
        const save = await this.productModel.findById(id);
        if (!save) {
            throw new NotFoundException();
        }
        return save;
    }
    async put(id: any, data: any): Promise<any> {
        const save = await this.productModel.findOneAndReplace({ _id: id }, data, { new: true });
        if (!save) {
            throw new NotFoundException();
        }
        return save;
    }
    async delete(id: any): Promise<String> {
        const save = await this.productModel.findOneAndDelete(id);
        if (!save) {
            throw new NotFoundException();
        }
        return 'item has been removed';
    }
}
