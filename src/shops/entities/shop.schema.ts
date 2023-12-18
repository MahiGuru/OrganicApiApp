import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserAddress } from 'src/addresses/entities/address.schema';
import { AttachmentSchema } from 'src/common/entities/attachment.schema';
import { CoreEntitySchema } from 'src/common/entities/core.schema';
import { Location, ShopSocials } from 'src/settings/entities/setting.schema';
import { User } from 'src/users/entities/user.schema';

@Schema()
export class Shop extends CoreEntitySchema {
  @Prop()
  owner_id: number;
  
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  staffs?: User[];
  @Prop()
  is_active: boolean;
  @Prop()
  orders_count: number;
  @Prop()
  products_count: number;
  
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Balance' })
  balance?: Balance;

  @Prop()
  name: string;
  
  @Prop()
  slug: string;
  
  @Prop()
  description?: string;
  
  @Prop()
  cover_image: AttachmentSchema;
  
  @Prop()
  logo?: AttachmentSchema;
  
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' })
  address: UserAddress;
  
  @Prop()
  settings?: ShopSettings;
  
  @Prop()
  distance?: string;
  
  @Prop()
  lat?: string;
  @Prop()
  lng?: string;
}

export class Balance {
  id: number;
  admin_commission_rate: number;
  shop: Shop;
  total_earnings: number;
  withdrawn_amount: number;
  current_balance: number;
  payment_info: PaymentInfo;
}

export class PaymentInfo {
  account: string;
  name: string;
  email: string;
  bank: string;
}

export class ShopSettings {
  socials: ShopSocials[];
  contact: string;
  location: Location;
  website: string;
}

export type ShopDocument = HydratedDocument<Shop>;

export const ShopSchema = SchemaFactory.createForClass(Shop);