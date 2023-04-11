import { Body, Controller, Post } from '@nestjs/common';
import { BaseController } from './BaseController';
import { ColorService } from 'src/Services/ColorService';
import { Color } from 'src/Models/Entitys/Selection/Color';

@Controller('color')
export class ColorController extends BaseController<ColorService, Color> {
    constructor(ColorService: ColorService) {
        super(ColorService);
    }
}
