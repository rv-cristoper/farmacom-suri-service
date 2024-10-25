import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseSchema } from './base-schema';

export type ProductStockDocument = HydratedDocument<ProductStock>;

@Schema({ timestamps: true, versionKey: false })
export class ProductStock extends BaseSchema {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'Product',
  })
  product: Types.ObjectId;

  @Prop({
    required: true,
  })
  stock: number;

  @Prop({
    required: true,
  })
  expirationDate: Date;
}

export const ProductStockSchema = SchemaFactory.createForClass(ProductStock);
