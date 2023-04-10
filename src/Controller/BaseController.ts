import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BaseService } from '../Services/BaseService';
import { BaseEntity } from 'src/Models/Entitys/BaseEntity';

export class BaseController<Service extends BaseService<Entity>, Entity extends BaseEntity> {
    constructor(protected service: Service) {}
    @Post()
    create(@Body() data: Entity): Promise<Entity> {
        return this.service.create(data);
    }
    @Get(':id')
    get(@Param('id') id: any): Promise<Entity> {
        return this.service.get(id);
    }
    @Put(':id')
    put(@Param('id') id: any, @Body() data: Entity): Promise<Entity> {
        return this.service.put(id, data);
    }
    @Delete(':id')
    delete(@Param('id') id: any): Promise<String> {
        return this.service.delete(id);
    }
}
