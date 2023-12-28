import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Location, ShopSocials } from 'src/settings/entities/setting.schema';
import { Shop } from './shop.entity';

@Schema({_id: false})
export class PaymentInfo {
  
  @Prop()
  account: string;
  
  @Prop()
  name: string;
  
  @Prop()
  email: string;
  
  @Prop()
  bank: string;
}
export const PaymentInfoSchema = SchemaFactory.createForClass(PaymentInfo);

@Schema({_id: false})
export class ShopSettings {
  @Prop()
  socials: ShopSocials[];
  
  @Prop()
  contact: string;
  
  @Prop()
  location: Location;
  
  @Prop()
  website: string;
}


@Schema({_id: false})
export class Balance {
  @Prop()
  id: number;

  @Prop()
  admin_commission_rate: number;
  
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Shop.name })
  shop: Shop;
  
  @Prop()
  total_earnings: number;
  
  @Prop()
  withdrawn_amount: number;
  
  @Prop()
  current_balance: number;
  
  // @Prop({type: mongoose.Schema.Types.ObjectId, ref: PaymentInfo.name })
  @Prop({type: PaymentInfoSchema})
  payment_info: PaymentInfo;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);


export const ShopSettingSchema = SchemaFactory.createForClass(ShopSettings);
