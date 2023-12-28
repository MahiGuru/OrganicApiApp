import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Attachment } from 'src/common/entities/attachment.entity';
import { AttachmentSchema } from 'src/common/entities/attachment.schema';
import { CoreEntity } from 'src/common/entities/core.entity';

@Schema({_id: false})
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
export const BannerSchema = SchemaFactory.createForClass(Banner); 

@Schema({_id: false})
export class TypeSettings {
  @Prop()
  isHome: boolean;
  @Prop()
  layoutType: string;
  @Prop()
  productCard: string;
}
export const TypeSettingSchema = SchemaFactory.createForClass(TypeSettings);

@Schema()
export class Type extends CoreEntity {
  @Prop()
  name: string;
  @Prop()
  slug: string;
  
  @Prop()
  image: Attachment;
  
  @Prop()
  icon: string;
  
  @Prop({type: [{type: BannerSchema}]})
  banners?: Banner[];
  
  @Prop([])
  promotional_sliders?: AttachmentSchema[];
  
  @Prop({type: TypeSettingSchema})
  settings?: TypeSettings;
  
  @Prop()
  language: string;

  @Prop([String])
  translated_languages: string[];
}

export const TypeSchema = SchemaFactory.createForClass(Type); 