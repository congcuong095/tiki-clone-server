import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from './BaseService';
import { Category } from 'src/Models/Entitys/Category';
import mongoose, { Model, Types } from 'mongoose';
import { Color } from 'src/Models/Entitys/Selection/Color';
import { CrossBorderService } from './CrossBorderService';

@Injectable()
export class CategoryService extends BaseService<Category> {
    constructor(
        @InjectModel('Category') CategoryModel: Model<Category>,
        private readonly CrossBorderService: CrossBorderService,
    ) {
        super(CategoryModel);
    }

    async deleteData(): Promise<any> {
        const save = await this.repository.deleteMany({ level_category: 3 });
        if (!save) {
            throw new NotFoundException();
        }
        return save;
    }
}
