import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSelection } from './BaseSelection';

export type SellerDocument = HydratedDocument<Seller>;

@Schema({ timestamps: true })
export class Seller extends BaseSelection {}

export const SellerSchema = SchemaFactory.createForClass(Seller);
