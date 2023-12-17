import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CoreEntitySchema } from 'src/common/entities/core.schema';
import { Order } from 'src/orders/entities/order.schema';
import { Shop } from 'src/shops/entities/shop.schema';
import { User } from 'src/users/entities/user.schema';

export enum RefundStatus {
  APPROVED = 'Approved',
  PENDING = 'Pending',
  REJECTED = 'Rejected',
  PROCESSING = 'Processing',
}

@Schema()
export class Refund extends CoreEntitySchema {
  @Prop()
  amount: string;
  @Prop()
  status: RefundStatus;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop: Shop;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order: Order;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customer: User;
}
export type RefundDocument = HydratedDocument<Refund>; 

export const RefundSchema = SchemaFactory.createForClass(Refund); 