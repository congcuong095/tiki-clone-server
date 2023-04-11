import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSelection } from './BaseSelection';

export type ColorDocument = HydratedDocument<Color>;

@Schema({ timestamps: true })
export class Color extends BaseSelection {}

export const ColorSchema = SchemaFactory.createForClass(Color);
