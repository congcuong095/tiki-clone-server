import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from './BaseService';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Color } from 'src/Models/Entitys/Selection/Color';

@Injectable()
export class ColorService extends BaseService<Color> {
    constructor(@InjectModel('Color') ColorModel: Model<Color>) {
        super(ColorModel);
    }
}
