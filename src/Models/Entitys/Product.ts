import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Category } from './Category';
import { Color } from './Selection/Color';
import { Brand } from './Selection/Brand';
import { BaseEntity } from './BaseEntity';
import { Seller } from './Selection/Seller';

export type ProductDocument = HydratedDocument<Product>;
process.env.TZ = 'Asia/Ho_Chi_Minh';
@Schema({ timestamps: true })
export class Product extends BaseEntity {
    @Prop()
    name: String;
    @Prop()
    url_key: String;
    @Prop()
    url_path: String;
    @Prop()
    brand_name: String;
    @Prop()
    short_description: String;
    @Prop()
    price: Number;
    @Prop({
        type: [
            {
                code: { type: String },
                icon: { type: String },
                type: { type: String },
                placement: { type: String },
                text: { type: String },
            },
        ],
        _id: false,
    })
    badges_new: {
        code: String;
        icon: String;
        type: String;
        placement: String;
        text: String;
    }[];
    @Prop()
    discount: Number;
    @Prop()
    discount_rate: Number;
    @Prop()
    rating_average: Number;
    @Prop()
    review_count: Number;
    @Prop()
    thumbnail_url: String;
    @Prop({ type: { text: String, value: String }, _id: false })
    quantity_sold: { text: String; value: Number };
    @Prop()
    original_price: Number;
    @Prop()
    shippable: Boolean;
    @Prop()
    advertisement: Boolean;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
    category: Category[];
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Color' }] })
    color: Color[];
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }] })
    brand: Brand[];
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seller' }] })
    sellerBy: Seller[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
