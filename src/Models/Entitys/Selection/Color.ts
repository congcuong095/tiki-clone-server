import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSelection } from './BaseSelection';

export type ColorDocument = HydratedDocument<Color>;

@Schema()
export class Color extends BaseSelection {}

export const ColorSchema = SchemaFactory.createForClass(Color);
