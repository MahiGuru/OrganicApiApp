import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CoreEntitySchema } from 'src/common/entities/core.schema';
import { Product } from 'src/products/entities/product.schema';
import { User } from 'src/users/entities/user.schema';

@Schema()
export class Wishlist extends CoreEntitySchema {
  
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;
  
  @Prop()
  product_id: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User[];
  
  @Prop()
  user_id: string;
}

export type WishlistDocument = HydratedDocument<Wishlist>;

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);