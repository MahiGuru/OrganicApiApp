import { ShopSocials } from '../../settings/entities/setting.entity';
import { Type } from '../../types/entities/type.entity';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CoreEntitySchema } from 'src/common/entities/core.schema';
import { AttachmentSchema } from 'src/common/entities/attachment.schema';

@Schema()
export class Manufacturer extends CoreEntitySchema {
  @Prop()
  cover_image?: AttachmentSchema;

  @Prop()
  description?: string;

  @Prop()
  image?: AttachmentSchema;

  @Prop()
  is_approved?: boolean;

  @Prop()
  name: string;

  @Prop()
  products_count?: number;

  @Prop()
  slug?: string;

  @Prop()
  socials?: ShopSocials;

  @Prop()
  type: Type;

  @Prop()
  type_id?: string;

  @Prop()
  website?: string;

  @Prop()
  language?: string;

  @Prop([String])
  translated_languages?: string[];

}
export type ManufacturerDocument = HydratedDocument<Manufacturer>;

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);