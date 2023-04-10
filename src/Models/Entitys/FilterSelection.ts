import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from './Category';
import { BaseEntity } from './BaseEntity';

export type FilterSelectionDocument = HydratedDocument<FilterSelection>;

@Schema()
export class FilterSelection extends BaseEntity {
    @Prop()
    query_name: String;
    @Prop()
    display_name: String;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
    category: Category[];
}

export const FilterSelectionSchema = SchemaFactory.createForClass(FilterSelection);
