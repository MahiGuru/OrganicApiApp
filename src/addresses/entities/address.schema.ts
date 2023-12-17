import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CoreEntity } from 'src/common/entities/core.entity';
import { CoreEntitySchema } from 'src/common/entities/core.schema';
import { User } from 'src/users/entities/user.entity';

export enum AddressType {
  BILLING = 'billing',
  SHIPPING = 'shipping',
}

@Schema()
export class UserAddress {
  @Prop()
  street_address: string;

  @Prop()
  country: string;
  
  @Prop()
  city: string;
  
  @Prop()
  state: string;
  
  @Prop()
  zip: string;
}

@Schema()
export class Address extends CoreEntitySchema {
  @Prop()
  title: string;
  
  @Prop()
  default: boolean;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' })
  address: UserAddress;
  
  @Prop()
  type: AddressType;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customer: User;
}

export type AddressDocument = HydratedDocument<Address>;
export type UserAddressDocument = HydratedDocument<UserAddress>;

export const UserAddressSchema = SchemaFactory.createForClass(Address);
export const AddressSchema = SchemaFactory.createForClass(Address);