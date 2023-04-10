import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseEntity } from 'src/Models/Entitys/BaseEntity';

export class BaseService<Entity extends BaseEntity> {
    constructor(protected repo: Model<Entity>) {}

    async create(data: any): Promise<any> {
        const createData = new this.repo(data);
        return createData.save();
    }
    async get(id: any): Promise<any> {
        const save = await this.repo.findById(id);
        if (!save) {
            throw new NotFoundException();
        }
        return save;
    }
    async put(id: any, data: any): Promise<any> {
        const save = await this.repo.findOneAndUpdate({ _id: id }, data, { new: true });
        if (!save) {
            throw new NotFoundException();
        }
        return save;
    }
    async delete(id: any): Promise<String> {
        const save = await this.repo.findOneAndDelete(id);
        if (!save) {
            throw new NotFoundException();
        }
        return 'Item has been removed!';
    }
}
