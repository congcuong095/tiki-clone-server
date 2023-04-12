import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSelection } from './BaseSelection';

export type CrossBorderDocument = HydratedDocument<CrossBorder>;

@Schema({ timestamps: true })
export class CrossBorder extends BaseSelection {}

export const CrossBorderSchema = SchemaFactory.createForClass(CrossBorder);
