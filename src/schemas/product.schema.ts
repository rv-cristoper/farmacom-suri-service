import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { HydratedDocument } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base-schema';
import { UnitOfMeasurement } from '../commons/enums/unitOfMeasurement.enum';
// import { Category } from './category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true, versionKey: false })
export class Product extends BaseSchema {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    required: false,
    default: '',
  })
  description?: string;

  @Prop({
    required: true,
  })
  location: string;

  @Prop({
    required: false,
    default: [],
  })
  photo?: string[];

  @Prop({
    required: false,
    default: true,
  })
  isActive?: boolean;

  @Prop({
    required: true,
  })
  unitOfMeasurement: UnitOfMeasurement;

  @Prop({
    required: true,
  })
  units: number;

  @Prop({
    required: false,
    default: 0,
  })
  packageOrBox?: number;

  @Prop({
    required: false,
    default: 0,
  })
  blisters?: number;

  // @Prop({
  //   required: true,
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Category',
  // })
  // category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ name: 1 });
