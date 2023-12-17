import { CoreEntity } from '../../common/entities/core.entity';
import { Attachment } from '../../common/entities/attachment.entity';
import { ShopSocials } from '../../settings/entities/setting.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CoreEntitySchema } from 'src/common/entities/core.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { AttachmentSchema } from 'src/common/entities/attachment.schema';

@Schema()
export class Author extends CoreEntitySchema {
  @Prop()
  bio?: string;

  @Prop()
  born?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' })
  cover_image?: AttachmentSchema;

  @Prop()
  death?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' })
  image?: AttachmentSchema;

  @Prop()
  is_approved?: boolean;

  @Prop()
  languages?: string;

  @Prop()
  name: string;

  @Prop()
  products_count?: number;

  @Prop()
  quote?: string;

  @Prop()
  slug?: string;

  @Prop()
  socials?: ShopSocials;

  @Prop()
  language?: string;

  @Prop([String])
  translated_languages?: string[];
}

export type AuthorDocument = HydratedDocument<Author>;

export const AuthorSchema = SchemaFactory.createForClass(Author);