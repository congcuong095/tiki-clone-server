import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSelection } from './BaseSelection';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ timestamps: true })
export class Brand extends BaseSelection {}

export const BrandSchema = SchemaFactory.createForClass(Brand);
