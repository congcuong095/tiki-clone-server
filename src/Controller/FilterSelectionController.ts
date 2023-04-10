import { Controller } from '@nestjs/common';
import { BaseController } from './BaseController';
import { FilterSelectionService } from 'src/Services/FilterSelectionService';
import { FilterSelection } from 'src/Models/Entitys/FilterSelection';

@Controller('filterSelection')
export class FilterSelectionController extends BaseController<FilterSelectionService, FilterSelection> {
    constructor(FilterSelectionService: FilterSelectionService) {
        super(FilterSelectionService);
    }
}
