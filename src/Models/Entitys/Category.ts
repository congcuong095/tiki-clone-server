import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from './Product';
import { FilterSelection } from './FilterSelection';
import { BaseEntity } from './BaseEntity';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
    toJSON: {
        getters: true,
    },
})
export class Category extends BaseEntity {
    @Prop()
    query_value: Number;
    @Prop()
    display_value: String;
    @Prop({
        get: function () {
            return this.product.length;
        },
    })
    count: Number;
    @Prop()
    url_key: String;
    @Prop()
    url_path: String;
    @Prop()
    level_category: Number;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    parentCategory: Category;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
    product: Product[];
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FilterSelection' }] })
    filterSelection: FilterSelection[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
