import { Order } from 'src/orders/entities/order.schema';
import { Shop } from 'src/shops/entities/shop.schema';
import { User } from 'src/users/entities/user.schema';
import { Product } from 'src/products/entities/product.schema';
import { AttachmentSchema } from 'src/common/entities/attachment.schema';
import { Report } from './reports.schema';
import { Feedback } from 'src/feedbacks/entities/feedback.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CoreEntitySchema } from 'src/common/entities/core.schema';

@Schema()
export class Review extends CoreEntitySchema {
  @Prop()
  rating: number;
  
  @Prop()
  name: string;
  
  @Prop()
  comment: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop: Shop;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order: Order;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customer: User;
  
  @Prop([String])
  photos: AttachmentSchema[];
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }] })
  feedbacks: Feedback[];
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' })
  my_feedback: Feedback;
  
  @Prop()
  positive_feedbacks_count: number;
  
  @Prop()
  negative_feedbacks_count: number;
  
  @Prop()
  user_id: number | string;
  
  @Prop()
  product_id: number | string;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }] })
  abusive_reports: Report[];
  
  @Prop()
  shop_id: string;
  
  @Prop()
  variation_option_id: string;
  
  @Prop()
  abusive_reports_count?: number;
}


export type ReviewDocument = HydratedDocument<Review>; 
export const ReviewSchema = SchemaFactory.createForClass(Review); 