import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CoreEntitySchema } from 'src/common/entities/core.schema';

@Schema()
export class Shipping extends CoreEntitySchema {
  @Prop()
  name: string;
  @Prop()
  amount: number;
  @Prop()
  is_global: boolean;
  @Prop()
  type: ShippingType;
}

export enum ShippingType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  FREE = 'free',
}

export type ShippingDocument = HydratedDocument<Shipping>;

export const ShippingSchema = SchemaFactory.createForClass(Shipping);