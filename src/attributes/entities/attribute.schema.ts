
import { Shop } from 'src/shops/entities/shop.entity';
import { AttributeValue } from './attribute-value.entity';
import { CoreEntitySchema } from 'src/common/entities/core.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Attribute extends CoreEntitySchema {
  
  @Prop()
  name: string;
  
  @Prop()
  shop_id: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop: Shop;
  
  @Prop()
  slug: string;
  
  @Prop([String])
  values: AttributeValue[];
  
  @Prop()
  language: string;
  
  @Prop([String])
  translated_languages: string[];
}

export type AttributeDocument = HydratedDocument<Attribute>;

export const AttributeSchema = SchemaFactory.createForClass(Attribute);