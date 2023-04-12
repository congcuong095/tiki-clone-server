import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseEntity } from 'src/Models/Entitys/BaseEntity';

export class BaseService<Entity extends BaseEntity> {
    constructor(protected repository: Model<Entity>) {}

    async createOne(data: any): Promise<any> {
        const createData = new this.repository(data);
        return createData.save();
    }
    async getOneById(id: any): Promise<any> {
        const save = await this.repository.findById(id);
        if (!save) {
            throw new NotFoundException();
        }
        return save;
    }
    async putOne(id: any, data: any): Promise<any> {
        const save = await this.repository.findOneAndUpdate({ _id: id }, data, { new: true });
        if (!save) {
            throw new NotFoundException();
        }
        return save;
    }
    async deleteOneById(id: any): Promise<String> {
        const save = await this.repository.findOneAndDelete(id);
        if (!save) {
            throw new NotFoundException();
        }
        return 'Item has been removed!';
    }

    async getAllData(): Promise<any> {
        const save = await this.repository.find();
        if (!save) {
            throw new NotFoundException();
        }
        return save;
    }

    async updateOneData(id, data): Promise<any> {
        const save = await this.repository.findByIdAndUpdate(id, data);
        if (!save) {
            throw new NotFoundException();
        }
        return save;
    }
}
