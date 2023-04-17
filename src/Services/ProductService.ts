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
import { ListProductDTO } from 'src/Models/DTO/ListProductDTO';
import { QueryParam } from 'src/Models/DTO/QueryParam';
import { PagingDTO } from 'src/Models/DTO/PagingDTO';
import {
    FilterDTO,
    CategoryFilter,
    NowFilter,
    AstraFilter,
    InstallmentFilter,
    RatingFilter,
    PriceFilter,
    SelectionFilter,
    CrossBorderFilter,
} from 'src/Models/DTO/FilterDTO';
import { SortDTO } from 'src/Models/DTO/SortDTO';
import { Category } from 'src/Models/Entitys/Category';

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
            // Update  category
            result.category.forEach(async (item) => {
                let category;
                await this.categoryService.getOneById(item).then((res) => (category = res));
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
                this.categoryService.updateOneData(item, category);
            });
            //Update  color
            result.color.forEach(async (item) => {
                let color;
                await this.colorService.getOneById(item).then((res) => (color = res));
                if (!color.product.includes(result._id)) {
                    color.product.push(result._id);
                }

                result.category.forEach((x) => {
                    if (!color.category.includes(x)) {
                        color.category.push(x);
                    }
                });
                this.colorService.updateOneData(item, { category: color });
            });
            //Update  brand
            result.brand.forEach(async (item) => {
                let brand;
                await this.brandService.getOneById(item).then((res) => (brand = res));
                if (!brand.product.includes(result._id)) {
                    brand.product.push(result._id);
                }

                result.category.forEach((x) => {
                    if (!brand.category.includes(x)) {
                        brand.category.push(x);
                    }
                });
                this.brandService.updateOneData(item, brand);
            });
            //Update  Seller
            result.sellerBy.forEach(async (item) => {
                let seller;
                await this.sellerService.getOneById(item).then((res) => (seller = res));
                if (!seller.product.includes(result._id)) {
                    seller.product.push(result._id);
                }

                result.category.forEach((x) => {
                    if (!seller.category.includes(x)) {
                        seller.category.push(x);
                    }
                });
                this.sellerService.updateOneData(item, seller);
            });
            //Update  crossBorder
            result.crossBorder.forEach(async (item) => {
                let crossBorder;
                await this.crossBorderService.getOneById(item).then((res) => (crossBorder = res));
                if (!crossBorder.product.includes(result._id)) {
                    crossBorder.product.push(result._id);
                }

                result.category.forEach((x) => {
                    if (!crossBorder.category.includes(x)) {
                        crossBorder.category.push(x);
                    }
                });
                this.crossBorderService.updateOneData(item, crossBorder);
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

    async getListProduct(query: QueryParam): Promise<ListProductDTO> {
        let {
            limit,
            category,
            page,
            urlKey,
            support_p2h_delivery,
            seller_asa_cashback,
            support_installment,
            sort,
            option_color,
            price,
            rating,
            brand,
            seller,
            is_cross_border,
        } = query;
        //Convert query
        let resultData: ListProductDTO = {
            data: [],
            paging: undefined,
            filters: [],
            sort_options: [],
        };
        //Init variable
        let listProduct: Product[] = [];
        let categoryRoot: Category = undefined;
        let paging: PagingDTO = {};
        let listFilter: FilterDTO[] = [];
        let listSort: SortDTO[] = SortDTO;
        const newCategoryFilter = CategoryFilter;
        const newNowFilter = NowFilter;
        const newAstraFilter = AstraFilter;
        const newInstallmentFilter = InstallmentFilter;
        const newRatingFilter = RatingFilter;
        const newPriceFilter = PriceFilter;
        let newSelectionFilter = SelectionFilter;
        const newCrossBorderFilter = CrossBorderFilter;
        //Get list Product and sort
        if (category && urlKey) {
            await this.categoryService
                .findOnePopulateProduct({ category, urlKey, sort })
                .then((res) => {
                    categoryRoot = res;
                    listProduct = res.product;
                })
                .catch((err) => console.log(err));
        }
        //---------------------------------------------Sort-----------------------------------------------

        //Update sort option for respone
        if (sort) {
            listSort.forEach((item) => {
                item.selected = item.query_value == sort;
            });
        }
        //---------------------------------------------Filters Product-----------------------------------------------
        //Now
        if (Number(support_p2h_delivery) == 1) {
            listProduct = listProduct.filter((item) => {
                return item.badges_new.some((x) => {
                    return x.code == 'tikinow';
                });
            });
            newNowFilter.values[0].selected = true;
        } else {
            newNowFilter.values[0] && (newNowFilter.values[0].selected = false);
        }
        //Astra
        if (Number(seller_asa_cashback) == 1) {
            listProduct = listProduct.filter((item) => {
                return item.badges_new.some((x) => {
                    return x.code == 'asa_reward_badge';
                });
            });
            newAstraFilter.values[0].selected = true;
        } else {
            newAstraFilter.values[0] && (newAstraFilter.values[0].selected = false);
        }
        //Installment
        if (Number(support_installment) == 1) {
            listProduct = listProduct.filter((item) => {
                return item.badges_new.some((x) => {
                    return x.code == 'installment';
                });
            });
            newInstallmentFilter.values[0].selected = true;
        } else {
            newInstallmentFilter.values[0] && (newInstallmentFilter.values[0].selected = false);
        }
        //Rating
        if (!isNaN(Number(rating))) {
            listProduct = listProduct.filter((item) => {
                return Number(item.rating_average) >= Number(rating);
            });
            let indexRating = newRatingFilter.values.findIndex((item) => Number(item.query_value) == Number(rating));
            newRatingFilter.values.unshift(newRatingFilter.values.splice(indexRating, 1)[0]);
        }
        //Price
        if (price) {
            let convertPrice = price.split(',');
            let priceFrom = Number(convertPrice[0]);
            let priceTo = Number(convertPrice[1]);
            listProduct = listProduct.filter((item) => {
                return Number(item.price) >= priceFrom && Number(item.price) <= priceTo;
            });
        }

        //Brand
        if (brand) {
            let convertBrand = brand.split(',');
            let arrIdBrand = [];
            for (let item of convertBrand) {
                await this.brandService
                    .findOne({ query_value: item })
                    .then((res) => arrIdBrand.push(res._id.toString()));
            }

            listProduct = listProduct.filter((item) => {
                let check = false;
                item.brand.forEach((x) => {
                    check = arrIdBrand.includes(x.toString());
                });
                return check;
            });
        }
        //Color
        if (option_color) {
            let convertColor = option_color.split(',');
            let arrIdColor = [];
            for (let item of convertColor) {
                await this.colorService
                    .findOne({ query_value: item })
                    .then((res) => arrIdColor.push(res._id.toString()));
            }

            listProduct = listProduct.filter((item) => {
                let check = false;
                item.color.forEach((x) => {
                    check = arrIdColor.includes(x.toString());
                });
                return check;
            });
        }
        //Seller
        if (seller) {
            let convertSeller = seller.split(',');
            let arrIdSeller = [];
            for (let item of convertSeller) {
                await this.sellerService
                    .findOne({ query_value: item })
                    .then((res) => arrIdSeller.push(res._id.toString()));
            }

            listProduct = listProduct.filter((item) => {
                let check = false;
                item.sellerBy.forEach((x) => {
                    check = arrIdSeller.includes(x.toString());
                });
                return check;
            });
        }
        //Cross border
        if (!isNaN(Number(is_cross_border))) {
            let idCrossBorder;
            await this.crossBorderService
                .findOne({ query_value: Number(is_cross_border) })
                .then((res) => (idCrossBorder = res._id.toString()));

            listProduct = listProduct.filter((item) => {
                return item.crossBorder.some((x) => {
                    return x.toString() == idCrossBorder;
                });
            });

            let indexCrossBorder = newCrossBorderFilter.values.findIndex(
                (item) => Number(item.query_value) == Number(is_cross_border),
            );
            newCrossBorderFilter.values.unshift(newCrossBorderFilter.values.splice(indexCrossBorder, 1)[0]);
        }
        //---------------------------------------------Show Sidebar-----------------------------------------------
        //Update category of Sidebar
        let listCategory;
        await this.categoryService
            .getCategoryToFilter({
                parentCategory: categoryRoot._id,
                level_category: Number(categoryRoot.level_category) + 1,
            })
            .then((res) => (listCategory = res));
        if (listCategory.length > 0) {
            newCategoryFilter.values = listCategory;

            listFilter.unshift(newCategoryFilter);
        }
        //Update Now, Astra, Installment of Sidebar
        let hasNow,
            hasAstra,
            hasInstallment = false;
        listProduct.forEach((item) => {
            item.badges_new.forEach((x) => {
                switch (x.code) {
                    case 'tikinow':
                        hasNow = true;
                        break;
                    case 'installment':
                        hasInstallment = true;
                        break;
                    case 'asa_reward_badge':
                        hasAstra = true;
                        break;
                }
            });
        });
        if (hasNow) {
            newNowFilter.values = [
                Number(support_p2h_delivery) == 1
                    ? { display_value: 'Có', query_value: '1', selected: true }
                    : { display_value: 'Có', query_value: '1', selected: false },
            ];
            listFilter.push(newNowFilter);
        }
        if (hasAstra) {
            newAstraFilter.values = [
                Number(seller_asa_cashback) == 1
                    ? { display_value: 'Có', query_value: '1', selected: true }
                    : { display_value: 'Có', query_value: '1', selected: false },
            ];
            listFilter.push(newAstraFilter);
        }
        if (hasInstallment) {
            newInstallmentFilter.values = [
                Number(support_installment) == 1
                    ? { display_value: 'Có', query_value: '1', selected: true }
                    : { display_value: 'Có', query_value: '1', selected: false },
            ];
            listFilter.push(newInstallmentFilter);
        }
        //Update rating of Sidebar
        listFilter.push(newRatingFilter);
        //Update price of Sidebar
        if (categoryRoot.product.length >= 3) {
            let maxPrice = Math.max(...categoryRoot.product.map((x) => Number(x.price)));
            let fromPrice = (Math.floor(maxPrice / 3 / 1000) * 1000).toString();
            let toPrice = (Math.floor(((maxPrice / 3) * 2) / 1000) * 1000).toString();

            newPriceFilter.values = [
                {
                    query_value: '0,' + fromPrice,
                    display_value: `Dưới ${fromPrice}`,
                },
                {
                    query_value: fromPrice + ',' + toPrice,
                    display_value: `${fromPrice} -> ${toPrice}`,
                },
                {
                    query_value: toPrice + ',10000000000',
                    display_value: `Trên ${fromPrice}`,
                },
            ];
            newPriceFilter.values.forEach((item) => {
                if (item.query_value == price) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }
            });
            listFilter.push(newPriceFilter);
        }
        //Update brand of Sidebar
        if (categoryRoot.brand.length > 0) {
            let newBrandFilter = { ...newSelectionFilter };
            newBrandFilter.values = [];
            newBrandFilter.display_name = 'Thương hiệu';
            newBrandFilter.query_name = 'brand';
            categoryRoot.brand.forEach((item) => {
                newBrandFilter.values.push(
                    brand && brand.includes(String(item.query_value))
                        ? {
                              display_value: String(item.display_value),
                              query_value: String(item.query_value),
                              selected: true,
                          }
                        : {
                              display_value: String(item.display_value),
                              query_value: String(item.query_value),
                              selected: false,
                          },
                );
            });
            listFilter.push(newBrandFilter);
        }
        //Update color of Sidebar
        if (categoryRoot.color.length > 0) {
            let newColorFilter = { ...newSelectionFilter };
            newColorFilter.values = [];
            newColorFilter.display_name = 'Màu sắc';
            newColorFilter.query_name = 'option_color';
            categoryRoot.color.forEach((item) => {
                newColorFilter.values.push(
                    option_color && option_color.includes(String(item.query_value))
                        ? {
                              display_value: String(item.display_value),
                              query_value: String(item.query_value),
                              selected: true,
                          }
                        : {
                              display_value: String(item.display_value),
                              query_value: String(item.query_value),
                              selected: false,
                          },
                );
            });
            listFilter.push(newColorFilter);
        }
        //Update seller of Sidebar
        if (categoryRoot.sellerBy.length > 0) {
            let newSellerByFilter = { ...newSelectionFilter };
            newSellerByFilter.values = [];
            newSellerByFilter.display_name = 'Nhà cung cấp';
            newSellerByFilter.query_name = 'seller';
            categoryRoot.sellerBy.forEach((item) => {
                newSellerByFilter.values.push(
                    seller && seller.includes(String(item.query_value))
                        ? {
                              display_value: String(item.display_value),
                              query_value: String(item.query_value),
                              selected: true,
                          }
                        : {
                              display_value: String(item.display_value),
                              query_value: String(item.query_value),
                              selected: false,
                          },
                );
            });
            listFilter.push(newSellerByFilter);
        }
        //Update cross border of Sidebar
        if (categoryRoot.crossBorder.length >= 2) {
            listFilter.push(newCrossBorderFilter);
        }

        //Hide infor
        listProduct.forEach((item) => {
            item.color = null;
            item.brand = null;
            item.sellerBy = null;
            item.crossBorder = null;
            item.category = null;
        });

        //Assign paging
        if (limit) {
            paging.per_page = Number(limit);
        }
        if (page) {
            paging.current_page = Number(page);
        }

        paging.total = listProduct.length;
        paging.last_page =
            listProduct.length % Number(limit) === 0
                ? Math.floor(listProduct.length / Number(limit))
                : Math.floor(listProduct.length / Number(limit)) + 1;

        //Assign result
        resultData.data = listProduct.slice(Number(limit) * (Number(page) - 1), Number(limit) * Number(page));
        resultData.filters = listFilter;
        resultData.paging = paging;
        resultData.sort_options = listSort;

        return resultData;
    }
}
