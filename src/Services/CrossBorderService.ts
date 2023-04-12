import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrossBorder } from 'src/Models/Entitys/Selection/CrossBorder';
import { BaseService } from './BaseService';

@Injectable()
export class CrossBorderService extends BaseService<CrossBorder> {
    constructor(@InjectModel('CrossBorder') CrossBorderModel: Model<CrossBorder>) {
        super(CrossBorderModel);
    }
}
