import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseEntity } from '../BaseEntity';

export type BaseSelectionDocument = HydratedDocument<BaseSelection>;

@Schema()
export class BaseSelection extends BaseEntity {
    @Prop()
    display_value: String;
    @Prop()
    query_value: String;
}

export const BaseSelectionSchema = SchemaFactory.createForClass(BaseSelection);
