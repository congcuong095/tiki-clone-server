import { Body, Controller, Post } from '@nestjs/common';
import { BaseController } from './BaseController';
import { BrandService } from 'src/Services/BrandService';
import { Brand } from 'src/Models/Entitys/Selection/Brand';

@Controller('brand')
export class BrandController extends BaseController<BrandService, Brand> {
    constructor(BrandService: BrandService) {
        super(BrandService);
    }
}
