import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  Conversation,
  LatestMessage,
} from 'src/conversations/entities/conversation.entity';

@Schema()
export class Message extends LatestMessage {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' })
  conversation: Conversation;
}
