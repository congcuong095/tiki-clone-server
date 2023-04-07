import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop()
    name: String;
    url_key: String;
    @Prop()
    url_path: String;
    @Prop()
    brand_name: String;
    @Prop()
    short_description: String;
    @Prop()
    price: Number;
    @Prop([
        {
            code: String,
            icon: String,
            type: String,
            text: String,
        },
    ])
    badges_new: [
        {
            code: String;
            icon: String;
            type: String;
            text: String;
        },
    ];
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
    @Prop()
    thumbnail_width: Number;
    @Prop()
    thumbnail_height: Number;
    @Prop({ type: { text: String, value: String } })
    quantity_sold: { text: String; value: String };
    @Prop()
    original_price: Number;
    @Prop()
    shippable: Boolean;
    @Prop()
    advertisement: Boolean;
    @Prop()
    seller_id: Number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
