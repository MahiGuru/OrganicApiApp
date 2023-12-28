import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CoreEntitySchema } from 'src/common/entities/core.schema';
import { Shop } from 'src/shops/entities/shop.entity';

@Schema()
export class Withdraw extends CoreEntitySchema {
  @Prop()
  amount: number;
  
  @Prop()
  status: WithdrawStatus;
  
  @Prop()
  shop_id: number | string; 

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop: Shop;
  
  @Prop()
  payment_method: string;
  
  @Prop()
  details: string;
  
  @Prop()
  note: string;
}

export enum WithdrawStatus {
  APPROVED = 'Approved',
  PENDING = 'Pending',
  ON_HOLD = 'On hold',
  REJECTED = 'Rejected',
  PROCESSING = 'Processing',
}
export type WithdrawDocument = HydratedDocument<Withdraw>;

export const WithdrawSchema = SchemaFactory.createForClass(Withdraw);