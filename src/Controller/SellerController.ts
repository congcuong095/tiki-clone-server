import { Controller } from '@nestjs/common';
import { BaseController } from './BaseController';
import { SellerService } from 'src/Services/SellerService';
import { Seller } from 'src/Models/Entitys/Selection/Seller';

@Controller('seller')
export class SellerController extends BaseController<SellerService, Seller> {
    constructor(SellerService: SellerService) {
        super(SellerService);
    }
}
