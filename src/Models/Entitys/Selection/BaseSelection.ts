import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { BaseEntity } from '../BaseEntity';
import { Product } from '../Product';
import { Category } from '../Category';

export type BaseSelectionDocument = HydratedDocument<BaseSelection>;

@Schema()
export class BaseSelection extends BaseEntity {
    @Prop()
    display_value: String;
    @Prop()
    query_value: String;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
    product: Product[];
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
    category: Category[];
}

export const BaseSelectionSchema = SchemaFactory.createForClass(BaseSelection);
