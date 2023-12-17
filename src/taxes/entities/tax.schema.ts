import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CoreEntitySchema } from 'src/common/entities/core.schema';

@Schema()
export class Tax extends CoreEntitySchema {
  @Prop()
  name: string;
  @Prop()
  rate: number;
  @Prop()
  is_global: boolean;
  @Prop()
  country?: string;
  @Prop()
  state?: string;
  @Prop()
  zip?: string;
  @Prop()
  city?: string;
  @Prop()
  priority?: number;
  @Prop()
  on_shipping: boolean;
}

export type TaxDocument = HydratedDocument<Tax>; 

export const TaxSchema = SchemaFactory.createForClass(Tax); 