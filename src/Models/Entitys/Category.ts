import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Product } from './Product';
import { BaseEntity } from './BaseEntity';
import { Color } from './Selection/Color';
import { Brand } from './Selection/Brand';
import { Seller } from './Selection/Seller';
import { CrossBorder } from './Selection/CrossBorder';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
    timestamps: true,
})
export class Category extends BaseEntity {
    @Prop()
    query_value: Number;
    @Prop()
    display_value: String;
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
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Color' }] })
    color: Color[];
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }] })
    brand: Brand[];
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seller' }] })
    sellerBy: Seller[];
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CrossBorder' }] })
    crossBorder: CrossBorder[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
