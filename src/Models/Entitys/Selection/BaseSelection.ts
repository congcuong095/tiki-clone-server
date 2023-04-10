import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { FilterSelection } from '../FilterSelection';
import { BaseEntity } from '../BaseEntity';

export type BaseSelectionDocument = HydratedDocument<BaseSelection>;

@Schema()
export class BaseSelection extends BaseEntity {
    @Prop()
    query_name: String;
    @Prop()
    display_name: String;
    @Prop()
    multi_select: Boolean;
    @Prop()
    collapsed: Number;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'FilterSelection' })
    filterSelection: FilterSelection;
}

export const BaseSelectionSchema = SchemaFactory.createForClass(BaseSelection);
