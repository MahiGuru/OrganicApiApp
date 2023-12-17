import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.schema';
import { User } from 'src/users/entities/user.schema';
import { Feedback } from '../../feedbacks/entities/feedback.schema';
import { CoreEntitySchema } from 'src/common/entities/core.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Question extends CoreEntitySchema {
  @Prop()
  user_id: number;
  @Prop()
  product_id: number;
  @Prop()
  shop_id: number;
  @Prop()
  question?: string;
  @Prop()
  answer: string;
  @Prop()
  positive_feedbacks_count?: number;
  @Prop()
  negative_feedbacks_count?: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }] })
  feedbacks?: Feedback[];
  
  @Prop()
  my_feedback?: Feedback;
}

export type QuestionDocument = HydratedDocument<Question>; 

export const QuestionSchema = SchemaFactory.createForClass(Question); 