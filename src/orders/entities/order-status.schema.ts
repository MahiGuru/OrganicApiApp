import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CoreEntity } from 'src/common/entities/core.entity';

@Schema()
export class OrderStatus extends CoreEntity {
  @Prop()
  name: string;
  @Prop()
  color: string;
  @Prop()
  serial: number;
  @Prop()
  slug: string;
  @Prop()
  language: string;
  @Prop()
  translated_languages: string[];
}

export type OrderStatusDocument = HydratedDocument<OrderStatus>;

export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatus);