import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base-schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true, versionKey: false })
export class Category extends BaseSchema {
    @Prop({
        required: true,
        unique: true,
    })
    name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({ name: 1 });