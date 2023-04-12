import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from 'src/Models/Entitys/Selection/Brand';
import { BaseService } from './BaseService';

@Injectable()
export class BrandService extends BaseService<Brand> {
    constructor(@InjectModel('Brand') BrandModel: Model<Brand>) {
        super(BrandModel);
    }
}
