import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Address } from 'src/addresses/entities/address.entity';
import { AttachmentSchema } from 'src/common/entities/attachment.schema';
import { CoreEntitySchema } from 'src/common/entities/core.schema';
import { User } from 'src/users/entities/user.schema';
import { Balance, BalanceSchema } from './balance.schema';
import { Setting } from 'src/settings/entities/setting.schema';
import { ShopSettings } from './shop.entity';
@Schema()
export class Shop extends CoreEntitySchema {
  @Prop()
  owner_id: string;
  
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name })
  owner: User;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }] })
  staffs?: User[];
  
  @Prop()
  is_active: boolean;
  @Prop()
  orders_count: number;
  @Prop()
  products_count: number;
  
  @Prop({type: BalanceSchema}) 
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
  
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Address.name })
  address: Address;
  
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Setting.name })
  settings?: Setting;
  
  @Prop()
  distance?: string;
  
  @Prop()
  lat?: string;

  @Prop()
  lng?: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);