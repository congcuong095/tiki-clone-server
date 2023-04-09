import { Prop, Schema } from "@nestjs/mongoose";
import { Product } from "../Entitys/Product";

@Schema()
export class ListProductDTO {
    @Prop()
    data: Product[]
}