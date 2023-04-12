import { Body, Get, Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Product } from 'src/Models/Entitys/Product';
import { BaseService } from './BaseService';
import { CategoryService } from './CategoryService';
import { ColorService } from './ColorService';
import { BrandService } from './BrandService';
import { SellerService } from './SellerService';
import { CrossBorderService } from './CrossBorderService';

@Injectable()
export class ProductService extends BaseService<Product> {
    constructor(
        @InjectModel('Product') productModel: Model<Product>,
        private readonly categoryService: CategoryService,
        private readonly brandService: BrandService,
        private readonly sellerService: SellerService,
        private readonly crossBorderService: CrossBorderService,
        private readonly colorService: ColorService,
        @InjectConnection() private readonly connection: mongoose.Connection,
    ) {
        super(productModel);
    }

    async addProduct(@Body() data: Product): Promise<Product> {
        const session = await this.connection.startSession();

        session.startTransaction();
        try {
            const createData = new this.repository(data);
            let result;
            await createData.save().then((res) => (result = res));
            // Update vao category
            result.category.forEach(async (item) => {
                let category;
                await this.categoryService.get(item).then((res) => (category = res));
                if (!category.product.includes(result._id)) {
                    category.product.push(result._id);
                }

                result.color.forEach((x) => {
                    if (!category.color.includes(x)) {
                        category.color.push(x);
                    }
                });
                result.brand.forEach((x) => {
                    if (!category.brand.includes(x)) {
                        category.brand.push(x);
                    }
                });
                result.sellerBy.forEach((x) => {
                    if (!category.sellerBy.includes(x)) {
                        category.sellerBy.push(x);
                    }
                });
                result.crossBorder.forEach((x) => {
                    if (!category.crossBorder.includes(x)) {
                        category.crossBorder.push(x);
                    }
                });
                this.categoryService.updateData(item, category);
            });
            //Update vao color
            result.color.forEach(async (item) => {
                let color;
                await this.colorService.get(item).then((res) => (color = res));
                if (!color.product.includes(result._id)) {
                    color.product.push(result._id);
                }

                result.category.forEach((x) => {
                    if (!color.category.includes(x)) {
                        color.category.push(x);
                    }
                });
                this.colorService.updateData(item, { category: color });
            });
            //Update vao brand
            result.brand.forEach(async (item) => {
                let brand;
                await this.brandService.get(item).then((res) => (brand = res));
                if (!brand.product.includes(result._id)) {
                    brand.product.push(result._id);
                }

                result.category.forEach((x) => {
                    if (!brand.category.includes(x)) {
                        brand.category.push(x);
                    }
                });
                this.brandService.updateData(item, brand);
            });
            //Update vao Seller
            result.sellerBy.forEach(async (item) => {
                let seller;
                await this.sellerService.get(item).then((res) => (seller = res));
                if (!seller.product.includes(result._id)) {
                    seller.product.push(result._id);
                }

                result.category.forEach((x) => {
                    if (!seller.category.includes(x)) {
                        seller.category.push(x);
                    }
                });
                this.sellerService.updateData(item, seller);
            });
            //Update vao crossBorder
            result.crossBorder.forEach(async (item) => {
                let crossBorder;
                await this.crossBorderService.get(item).then((res) => (crossBorder = res));
                if (!crossBorder.product.includes(result._id)) {
                    crossBorder.product.push(result._id);
                }

                result.category.forEach((x) => {
                    if (!crossBorder.category.includes(x)) {
                        crossBorder.category.push(x);
                    }
                });
                this.crossBorderService.updateData(item, crossBorder);
            });

            await session.commitTransaction();
            return result;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async getAllData(): Promise<any> {
        const save = await this.repository.find();
        if (!save) {
            throw new NotFoundException();
        }
        return save;
    }
}
