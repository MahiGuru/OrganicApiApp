import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Attachment } from 'src/common/entities/attachment.entity';
import { AttachmentSchema } from 'src/common/entities/attachment.schema';
import { CoreEntity } from 'src/common/entities/core.entity';
import { CoreEntitySchema } from 'src/common/entities/core.schema';
import { Product } from 'src/products/entities/product.entity';
import { Type } from 'src/types/entities/type.entity';

@Schema()
export class Category extends CoreEntitySchema {
  
  @Prop()
  name: string;
  
  @Prop()
  slug: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  parent?: Category;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  children?: Category[];
  
  @Prop()
  details?: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' })
  image?: AttachmentSchema;
  
  @Prop()
  icon?: string;
  
  @Prop()
  type?: Type;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products?: Product[];
  
  @Prop()
  language: string;
  
  @Prop([String])
  translated_languages: string[];
}

export type CategoryDocument = HydratedDocument<Category>;

export const CategorySchema = SchemaFactory.createForClass(Category);