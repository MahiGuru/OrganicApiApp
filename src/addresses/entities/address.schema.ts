import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CoreEntity } from 'src/common/entities/core.entity';
import { CoreEntitySchema } from 'src/common/entities/core.schema';
import { User } from 'src/users/entities/user.entity';

export enum AddressType {
  BILLING = 'billing',
  SHIPPING = 'shipping',
}


export class UserAddress {
  street_address: string;

  country: string;
  
  city: string;
  
  state: string;
  
  zip: string;
}

@Schema()
export class Address extends CoreEntitySchema {
  @Prop()
  title: string;
  
  @Prop()
  default: boolean;
  
  @Prop({})
  address: UserAddress;
  
  @Prop()
  type: AddressType;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customer: User;
}

export type AddressDocument = HydratedDocument<Address>;

export const AddressSchema = SchemaFactory.createForClass(Address);
