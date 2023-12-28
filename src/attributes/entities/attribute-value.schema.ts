import { CoreEntity } from 'src/common/entities/core.entity';
import { Attribute } from './attribute.entity';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CoreEntitySchema } from 'src/common/entities/core.schema';

@Schema()
export class AttributeValue extends CoreEntitySchema {
  
  @Prop()
  shop_id: number | string;

  @Prop()
  value: string;
  
  @Prop()
  meta?: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attribute' })
  attribute: Attribute;
}

export type AttributeValueDocument = HydratedDocument<AttributeValue>;

export const AttributeValueSchema = SchemaFactory.createForClass(AttributeValue);