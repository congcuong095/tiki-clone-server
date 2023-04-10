import { Injectable } from '@nestjs/common';
import { BaseService } from './BaseService';
import { FilterSelection } from 'src/Models/Entitys/FilterSelection';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FilterSelectionService extends BaseService<FilterSelection> {
    constructor(@InjectModel('FilterSelection') filterSelectionModel: Model<FilterSelection>) {
        super(filterSelectionModel);
    }
}
