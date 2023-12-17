import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Attachment } from 'src/common/entities/attachment.entity';
import { AttachmentSchema } from 'src/common/entities/attachment.schema';
import { CoreEntity } from 'src/common/entities/core.entity';

@Schema()
export class Type extends CoreEntity {
  @Prop()
  name: string;
  @Prop()
  slug: string;
  
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' })
  image: Attachment;
  
  @Prop()
  icon: string;
  
  @Prop()
  banners?: Banner[];
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' }] })
  promotional_sliders?: AttachmentSchema[];
  
  @Prop()
  settings?: TypeSettings;
  
  @Prop()
  language: string;

  @Prop([String])
  translated_languages: string[];
}

export class Banner {
  @Prop()
  id: number;
  @Prop()
  title?: string;
  @Prop()
  description?: string;
  @Prop()
  image: Attachment;
}

export class TypeSettings {
  @Prop()
  isHome: boolean;
  @Prop()
  layoutType: string;
  @Prop()
  productCard: string;
}
export type TypeDocument = HydratedDocument<Type>; 

export const TypeSchema = SchemaFactory.createForClass(Type); 