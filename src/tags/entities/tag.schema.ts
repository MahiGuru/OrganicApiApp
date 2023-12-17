import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AttachmentSchema } from 'src/common/entities/attachment.schema';
import { CoreEntitySchema } from 'src/common/entities/core.schema';
import { Product } from 'src/products/entities/product.schema';
import { Type } from 'src/types/entities/type.schema';

@Schema()
export class Tag extends CoreEntitySchema {
  
  @Prop()
  name: string;
  
  @Prop()
  slug: string;
  
  @Prop()
  parent: number;
  
  @Prop()
  details: string;
   
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' })
  image: AttachmentSchema;
  
  @Prop()
  icon: string;
  
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Type' })
  type: Type;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products: Product[];
  
  @Prop()
  language: string;

  @Prop([String])
  translated_languages: string[];
}

export type TagDocument = HydratedDocument<Tag>; 

export const TagSchema = SchemaFactory.createForClass(Tag); 