import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type BaseEntityDocument = HydratedDocument<BaseEntity>;

@Schema()
export class BaseEntity {
    @Prop()
    id: String;
}

export const BaseEntitySchema = SchemaFactory.createForClass(BaseEntity);
