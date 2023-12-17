import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Attachment } from 'src/common/entities/attachment.entity';
import { AttachmentSchema } from 'src/common/entities/attachment.schema';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Order } from 'src/orders/entities/order.entity';
 
export enum CouponType {
  FIXED_COUPON = 'fixed',
  PERCENTAGE_COUPON = 'percentage',
  FREE_SHIPPING_COUPON = 'free_shipping',
  DEFAULT_COUPON = 'fixed',
}

@Schema()
export class Coupon extends CoreEntity {
  @Prop()
  code: string;

  @Prop()
  description?: string;
  
  @Prop()
  minimum_cart_amount: number;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  orders?: Order[];
  
  @Prop()
  type: CouponType;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' })
  image: AttachmentSchema;
  
  @Prop()
  is_valid: boolean;
  
  @Prop()
  amount: number;
  
  @Prop()
  active_from: string;
  
  @Prop()
  expire_at: string;
  
  @Prop()
  language: string;
  
  @Prop([String])
  translated_languages: string[];
}

export type CouponDocument = HydratedDocument<Coupon>;

export const CouponSchema = SchemaFactory.createForClass(Coupon);