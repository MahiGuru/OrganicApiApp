import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CoreEntity } from 'src/common/entities/core.entity';
import { CoreEntitySchema } from 'src/common/entities/core.schema';
import { Shop } from 'src/shops/entities/shop.entity';
import { User } from 'src/users/entities/user.entity';

@Schema()
export class LatestMessage extends CoreEntitySchema {
  @Prop()
  body: string;
  @Prop()
  conversation_id: string;
  @Prop()
  user_id: string;
}

@Schema()
export class Conversation extends CoreEntitySchema {
  
  @Prop()
  shop_id: number;
  
  @Prop()
  unseen: boolean;
  
  @Prop()
  user_id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop: Shop;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'LatestMessage' })
  latest_message: LatestMessage;
}

export type ConversationDocument = HydratedDocument<Conversation>;
export type LatestMessageDocument = HydratedDocument<LatestMessage>;

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
export const LatestMessageSchema = SchemaFactory.createForClass(LatestMessage);