import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from 'src/Models/Entitys/Product';
import { ProductService } from 'src/Services/ProductService';
import { BaseController } from './BaseController';

@Controller('product')
export class ProductController extends BaseController<ProductService, Product> {
    constructor(productService: ProductService) {
        super(productService);
    }
}
