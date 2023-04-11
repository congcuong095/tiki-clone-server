import { Body, Controller, Post } from '@nestjs/common';
import { BaseController } from './BaseController';
import { SellerService } from 'src/Services/SellerService';
import { Seller } from 'src/Models/Entitys/Selection/Seller';

@Controller('seller')
export class SellerController extends BaseController<SellerService, Seller> {
    constructor(SellerService: SellerService) {
        super(SellerService);
    }
    @Post('/data')
    postData(@Body() data: any): Promise<any> {
        return this.service.postData(data);
    }
}
