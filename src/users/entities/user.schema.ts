import { Address } from 'src/addresses/entities/address.entity';
// import { Order } from 'src/orders/entities/order.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { Profile } from './profile.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CoreEntitySchema } from 'src/common/entities/core.schema';

@Schema({
  timestamps: true
})
export class User extends CoreEntitySchema {
  @Prop()
  name: string;
  
  @Prop()
  email: string;
  
  @Prop()
  password?: string;
  
  @Prop()
  shop_id?: number;
  
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile?: Profile;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }] })
  shops?: Shop[];
  
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  managed_shop?: Shop;
  
  @Prop()
  is_active?: boolean = true;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }] })
  address?: Address[];
  // orders?: Order[];
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);