import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from 'src/Models/Entitys/Product';
import { ProductService } from 'src/Services/ProductService';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
    @Post()
    create(@Body() product: Product): Promise<Product> {
        return this.productService.create(product);
    }
    @Get(':id')
    get(@Param('id') id: any): Promise<Product> {
        return this.productService.get(id);
    }
    @Put(':id')
    put(@Param('id') id: any, @Body() product: Product): Promise<Product> {
        return this.productService.put(id, product);
    }
    @Delete(':id')
    delete(@Param('id') id: any): Promise<String> {
        return this.productService.delete(id);
    }
}
