import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Product } from 'src/Models/Entitys/Product';
import { ProductService } from 'src/Services/ProductService';
import { BaseController } from './BaseController';
import { ListProductDTO } from 'src/Models/DTO/ListProductDTO';
import { QueryParam } from 'src/Models/DTO/QueryParam';

@Controller('product')
export class ProductController extends BaseController<ProductService, Product> {
    constructor(productService: ProductService) {
        super(productService);
    }
    @Post('/post')
    addProduct(@Body() data: Product): Promise<Product> {
        return this.service.addProduct(data);
    }

    @Get('/listing')
    getListProduct(@Query() query: QueryParam) {
        return this.service.getListProduct(query);
    }
}
