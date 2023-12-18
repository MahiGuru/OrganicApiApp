import { User } from './user.entity';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AttachmentSchema } from 'src/common/entities/attachment.schema';
import { CoreEntitySchema } from 'src/common/entities/core.schema';

@Schema()
export class Profile extends CoreEntitySchema {
  @Prop()
  avatar?: AttachmentSchema;

  @Prop()
  bio?: string;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Social' }] })
  socials?: Social[];
  
  @Prop()
  contact?: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customer?: User;
}

@Schema()
export class Social {
  
  @Prop()
  type: string;
  
  @Prop()
  link: string;
}

export type ProfileDocument = HydratedDocument<Profile>;
export type SocialDocument = HydratedDocument<Social>;

export const ProfileSchema = SchemaFactory.createForClass(Profile);
export const SocialSchema = SchemaFactory.createForClass(Social);