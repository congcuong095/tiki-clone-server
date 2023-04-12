import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller } from 'src/Models/Entitys/Selection/Seller';
import { BaseService } from './BaseService';

@Injectable()
export class SellerService extends BaseService<Seller> {
    constructor(@InjectModel('Seller') SellerModel: Model<Seller>) {
        super(SellerModel);
    }
    async getAllData(): Promise<any> {
        const save = await this.repository.find();
        if (!save) {
            throw new NotFoundException();
        }
        return save;
    }

    async updateData(id, data): Promise<any> {
        const save = await this.repository.findByIdAndUpdate(id, data);
        if (!save) {
            throw new NotFoundException();
        }
        return save;
    }
}
