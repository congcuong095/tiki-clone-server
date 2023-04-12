import { Body, Controller, Post } from '@nestjs/common';
import { BaseController } from './BaseController';
import { CrossBorderService } from 'src/Services/CrossBorderService';
import { CrossBorder } from 'src/Models/Entitys/Selection/CrossBorder';

@Controller('CrossBorder')
export class CrossBorderController extends BaseController<CrossBorderService, CrossBorder> {
    constructor(CrossBorderService: CrossBorderService) {
        super(CrossBorderService);
    }
}
