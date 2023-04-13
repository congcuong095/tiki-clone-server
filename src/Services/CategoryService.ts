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

    async findOnePopulateProduct({ category, urlKey, sort: sort }): Promise<Category> {
        let result;
        switch (sort) {
            case 'top_seller':
                result = await this.repository
                    .findOne({ query_value: category, url_key: urlKey })
                    .populate({ path: 'color' })
                    .populate({ path: 'brand' })
                    .populate({ path: 'sellerBy' })
                    .populate({ path: 'crossBorder' })
                    .populate({
                        path: 'product',
                        options: { sort: { 'quantity_sold.value': -1 } },
                        select: ' -__v -createdAt -updatedAt',
                    });
                break;
            case 'newest':
                result = await this.repository
                    .findOne({ query_value: category, url_key: urlKey })
                    .populate({ path: 'color' })
                    .populate({ path: 'brand' })
                    .populate({ path: 'sellerBy' })
                    .populate({ path: 'crossBorder' })
                    .populate({
                        path: 'product',
                        options: { sort: { updatedAt: -1 } },
                        select: ' -__v -createdAt -updatedAt',
                    });
                break;
            case 'price,asc':
                result = await this.repository
                    .findOne({ query_value: category, url_key: urlKey })
                    .populate({ path: 'color' })
                    .populate({ path: 'brand' })
                    .populate({ path: 'sellerBy' })
                    .populate({ path: 'crossBorder' })
                    .populate({
                        path: 'product',
                        options: { sort: { price: 1 } },
                        select: ' -__v -createdAt -updatedAt',
                    });
                break;
            case 'price,desc':
                result = await this.repository
                    .findOne({ query_value: category, url_key: urlKey })
                    .populate({ path: 'color' })
                    .populate({ path: 'brand' })
                    .populate({ path: 'sellerBy' })
                    .populate({ path: 'crossBorder' })
                    .populate({
                        path: 'product',
                        options: { sort: { price: -1 } },
                        select: ' -__v -createdAt -updatedAt',
                    });
                break;
            default:
                result = await this.repository
                    .findOne({ query_value: category, url_key: urlKey })
                    .populate({ path: 'color' })
                    .populate({ path: 'brand' })
                    .populate({ path: 'sellerBy' })
                    .populate({ path: 'crossBorder' })
                    .populate({
                        path: 'product',
                        options: { sort: { name: 1 } },
                        select: ' -__v -createdAt -updatedAt',
                    });
        }

        if (!result) {
            throw new NotFoundException();
        }
        return result;
    }

    async getCategoryToFilter(value: any): Promise<any> {
        const save = await this.repository
            .find(value)
            .select(['query_value', 'display_value', 'url_key', 'url_path', '-_id']);
        if (!save) {
            throw new NotFoundException();
        }
        return save;
    }
}
