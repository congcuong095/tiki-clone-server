import { Body, Controller, Post, Delete, Patch } from '@nestjs/common';
import { BaseController } from './BaseController';
import { CategoryService } from 'src/Services/CategoryService';
import { Category } from 'src/Models/Entitys/Category';

@Controller('category')
export class CategoryController extends BaseController<CategoryService, Category> {
    constructor(CategoryService: CategoryService) {
        super(CategoryService);
    }
}
