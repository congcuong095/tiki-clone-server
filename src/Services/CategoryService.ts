import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from './BaseService';
import { Category } from 'src/Models/Entitys/Category';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService extends BaseService<Category> {
    constructor(@InjectModel('Category') CategoryModel: Model<Category>) {
        super(CategoryModel);
    }
}